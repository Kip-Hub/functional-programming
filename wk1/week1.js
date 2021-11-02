const dataset = '../data/tech-track-dataset.json';
const windrichtingKey = 'Wat is je favoriete windrichting?';
const oogkleurKey = 'Wat is je oogkleur?';
const huisdierKey = 'Wat is je favoriete soort huisdier?';

fetchData(dataset).then((data) => {
    console.log("data fetched");

    const windRichting = parseWindrichting(data, windrichtingKey);
    // console.log(windRichting);

    const oogKleur = parseOogkleuren(data, oogkleurKey);

    const huisDier = parseHuisdieren(data, huisdierKey);

    let cleanedData = []

    for (let i = 0; i < data.length; i++) {
        cleanedData.push({
            fav_windrichting: windRichting[i],
            oogkleur: oogKleur[i],
            fav_huisdier: huisDier[i]
        })
    }

    console.table(cleanedData);

    showCleanedData(windRichting);
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
    var result = arr.map((item) => (item[key]).toString().toLowerCase().replace('-', ',').replace(' , ', ','));
    return result;
}

function parseHuisdieren(arr, key) {
    var result = arr.map((item) => (item[key]).toString().toLowerCase().replace(' of ', ',').replace(' ', '_'));
    return result;
}

function showCleanedData(data) {

    const container = document.querySelector("body");
    for (let i = 0; i < data.length; i++) {
        container.insertAdjacentHTML('beforeend', `<img src="../resources/${data[i]}.png"></img>`);
    }
}