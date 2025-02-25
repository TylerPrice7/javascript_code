const year2021 = "https://api.census.gov/data/2021/pep/population?get=POP_2021&for=us:*";
const year2020 = "https://api.census.gov/data/2021/pep/population?get=POP_2020&for=us:*";
const year201x = "https://api.census.gov/data/2019/pep/population?get=DATE_CODE,DATE_DESC,POP&for=us:*";
const year200x = "https://api.census.gov/data/2000/pep/int_population?get=POP,DATE_DESC&for=us:1";
const year199x = "https://api.census.gov/data/1990/pep/int_natrespop?get=YEAR,TOT_POP";
const census_data = [];

const get = async (url) => {
    /*
        this will be done asynchronously
     */
    return new Promise(
        function(resolve, reject) {
            let http = new XMLHttpRequest();
            http.onload = () => {
                if (http.status === 200) {
                    //  good
                    resolve(JSON.parse(http.response))
                } else {
                    // bad
                    reject(http.statusText)
                }
            }
            http.onerror = () => {
                reject(http.statusText)
            }
            console.log("URL: " + url);
            http.open("GET", url);
            http.send()
        }
    );
}

const doIt = async () => {
    let data = {};
    
    await on199xSuccess(data)
        .then(res => { if (res !== undefined) census_data.push(res); } );
    await on200xSuccess(data)
        .then(res => { if (res !== undefined) census_data.push(res); } );
    await on201xSuccess(data)
        .then(res => { if (res !== undefined) census_data.push(res); } );
    await on202xSuccess(data)
        .then(res => { if (res !== undefined) census_data.push(res); } );
    displayChart(census_data);
}

const displayChart = (census) => {
    console.log(census);
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 80;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleLinear(d3.extent(census, d => d.Year), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([240_000_000, d3.max(census, d => d.Population)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.Population));

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.format("d")));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40).tickFormat(d3.format(".3s")))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Population"));

    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(census));

    $("div#content").append(svg.node());
}

// Gets data for years 2020 and 2021 for the chart.
const on202xSuccess = async (data) => {
    let res = await get(year2020);
    // Get the year from the API string.
    let year = (res[0][0]).substring(4, 8);
    // The first key is the POP_202X and the value of that is the population of the specified year, 202X.
    census_data.push({"Population" : parseInt(res[1][0]), Year : year});
    res = await get(year2021);
    year = (res[0][0]).substring(4, 8);
    census_data.push({"Population" : parseInt(res[1][0]), Year : year});
}

// Gets data for years 2010-2019 for the chart.
const on201xSuccess = async (data) => {
    let res = await get(year201x);
    for (let data = 3; data < 13; data++) {
        let year = res[data][1].substring(4, 8);
        census_data.push({"Population" : parseInt(res[data][2]), Year : year});
    }
}

// Gets data for years 2000-2009 for the chart.
const on200xSuccess = async (data) => {
    let res = await get(year200x);
    for (let data = 2; data < 12; data++) {
        let year = res[data][1].substring(4, 8);
        census_data.push({"Population" : parseInt(res[data][0]), Year : year});
    }
}

// Gets data for years 1990-1999 for the chart.
const on199xSuccess = async (data) => {
    let res = await get(year199x);
    for (let data = 1; data < 11; data++) {
        let year = res[data][0];
        census_data.push({"Population" : parseInt(res[data][1]), Year : year});
    }
}

doIt();