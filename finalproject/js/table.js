class Table {
    constructor(data) {
        this.data = data;
        this.width = 900;
        this.height = 900;
        this.toggle = null;
    }

    createTable() {
        let tr = d3.select("#matchTable").select("thead").select("tr");
        let that = this;
        tr.selectAll("th")
            .on("click", function () {
                sort(this.textContent, that);
            });

        function sort(col, that) {
            let asc = 1,
                desc = -1;

            let tr = d3.select('#matchTable').select('thead').select('tr');
            tr.selectAll('th')
                .on('click', function () {
                    sort(this.textContent, that)
                });

            function sort(col, that) {
                let asc = 1,
                    desc = -1;

                if (that.toggle == null || that.toggle == asc)
                    that.toggle = desc;
                else
                    that.toggle = asc;
                let sorted;
                switch (col) {
                    case "Nationality":
                        sorted = that.data.sort(function (a, b) {
                            return d3.ascending(a.affected_nationality, b.affected_nationality);
                        });
                        break;
                    case "Death":
                        sorted = that.data.sort(function (a, b) {
                            return d3.ascending(a.dead, b.dead);
                        });
                        break;
                    case "Missing":
                        sorted = that.data.sort(function (a, b) {
                            return d3.ascending(a.missing, b.missing);
                        });
                        break;
                    case "Incident Region":
                        sorted = that.data.sort(function (a, b) {
                            return d3.ascending(a.incident_region, b.incident_region);
                        });
                        break;
                    case "Cause of Death":
                        sorted = that.data.sort(function (a, b) {
                            return d3.ascending(a.cause_of_death, b.cause_of_death);
                        });
                        break;
                    default:
                        break;
                }

                if (sorted != undefined) {
                    that.data = that.toggle > 0 ? sorted : sorted.reverse();

                    that.updateTable(that.data);
                }
            }
        }
    }

    updateTable(updatedData) {
        d3.select("#matchTable").select("tbody").selectAll("tr").remove();
        var table = d3.select("#matchTable");

        var tbody = table.select("tbody");
        var tbodytr = tbody.selectAll("tr").data(updatedData)
            .enter()
            .append("tr");
        tbodytr.selectAll("th")
            .data(trdata => {
                return [{
                    "key": trdata.affected_nationality
                }]
            })
            .enter()
            .append("th")
            .attr("class", "nationality")
            .text(d => {
                if (d.key.length > 0) {
                    //console.log(d.key + " " +d.key.length);
                    return d.key;
                } else {
                    return "Unknown";
                }
            });

        var rowtd = tbodytr.selectAll("td")
            .data(d => {
                return [{
                        "vis": "death count",
                        "key": "dead",
                        "value": d.dead
                    },
                    {
                        "vis": "miss count",
                        "key": "missing",
                        "value": d.missing
                    },
                    {
                        "vis": "incident region",
                        "key": "incident region",
                        "value": d.incident_region
                    },
                    {
                        "vis": "cause",
                        "key": "cause of death",
                        "value": d.cause_of_death
                    }
                ]
            })
            .enter()
            .append("td");

        let deathCount = rowtd.filter(d => {
            return d.vis == "death count";
        });

        deathCount
            .style("text-align", "center")
            .text(d => {
                return d.value;
            });

        let missCount = rowtd.filter(d => {
            return d.vis == "miss count";
        });

        missCount
            .style("text-align", "center")
            .text(d => {
                return d.value;
            });

        let incidentRegion = rowtd.filter(d => {
            return d.vis == "incident region";
        });

        incidentRegion
            .style("text-align", "center")
            .text(d => {
                return d.value;
            });

        let deathCause = rowtd.filter(d => {
            return d.vis == "cause";
        });

        deathCause
            .style("text-align", "center")
            .text(d => {
                return d.value;
            });

    }
}