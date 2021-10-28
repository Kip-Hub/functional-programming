const dataset = '/data/tech-track-dataset.json';
const windrichtingKey = 'Wat is je favoriete windrichting?';
const oogkleurKey = 'Wat is je oogkleur?';

fetchData(dataset).then((data) => {
    console.log("data fetched");

    const windrichtingen = parseWindrichting(data, windrichtingKey);
    console.log(windrichtingen);

    const oogKleur = parseOogkleuren(data, oogkleurKey);
    console.log(oogKleur);

    let cleanedData = []

    for (let i = 0; i < data.length; i++) {
        cleanedData.push({
            Windrichting: windrichtingen[i],
            Oogkleur: oogKleur[i]
        })
    }

    console.table(cleanedData);

});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch {
        console.log("Can't fetch data");
    }
}

function parseWindrichting(arr, key) {

    var result = arr.map((item) => (item[key]).toString().toLowerCase());
    return result;
}

function parseOogkleuren(arr, key) {
    var result = arr.map((item) => (item[key]).toString().toLowerCase().replace('-', ''));
    return result;
}