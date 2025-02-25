// Cunning is a good word to test. Lots of synonyms.

const word_api_link = (word) => {
    return `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;
}

const get = async (url) => {
    return new Promise(
        function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    //  good
                    resolve(JSON.parse(xhr.response))
                } else {
                    // bad
                    reject(xhr.statusText)
                }
            }
            xhr.onerror = () => {
                reject(xhr.statusText)
            }
            
            // Given from API website.
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                }
            });

            console.log("URL: " + url);
            xhr.open('GET', url);
            xhr.setRequestHeader('x-rapidapi-key', 'API_KEY');
            xhr.setRequestHeader('x-rapidapi-host', 'wordsapiv1.p.rapidapi.com');

            xhr.send();
        }
    );
};

const synonyms = []; // Store the synonyms given by the API

async function addSynonyms(word) {
    let res = await get(word_api_link(word));
    synonyms.length = 0; // Clear the array of previous words
    // Gives the synonyms a random size value between 10 and 50.
    res.synonyms.forEach(synonym => {
        synonyms.push({ synonym, size: Math.random() * 100 + 30 });
    });
    drawWordCloud();
}

function drawWordCloud() {
    let width = window.innerWidth - 50;
    let height = window.innerHeight - 50;
    // Empties any content that was in the div.
    $("div#content").empty();

    // Creates the svg to contain the word cloud.
    let svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);

    // Makes the layout for the word cloud.
    let layout = d3.layout.cloud()
        .size([width, height])
        .words(synonyms)
        .padding(10)
        // Rotates different ways
        .rotate(() => {
            let rand = Math.random();
            if (rand > 0.7)
                return 90;
            else if (rand > 0.35)
                return 0;
            else {
                return -90;
            }
        })
        .fontSize(d => d.size)
        .on("end", (synonyms) => {
            // Adds the styles to the svg to be appended to the div.
            svg.append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`)
            .selectAll("text")
            .data(synonyms)
            .enter().append("text")
            .style("font-size", d => d.size + "px")
            .style("fill", d => d3.schemeCategory10[Math.floor(Math.random() * 10)])
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .text(d => d.synonym);
        });

    // Makes the word cloud layout.
    layout.start();
    $("div#content").append(svg.node());
}

// When the "Submit" button is clicked, the word that the user entered creates the word cloud.
document.getElementById("submit-word").addEventListener("click", () => {
    const word = document.getElementById("word").value;
    addSynonyms(word);
});
