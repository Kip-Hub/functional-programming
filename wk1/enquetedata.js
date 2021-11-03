const dataset = '../data/tech-track-dataset.json';
const windrichtingKey = 'Wat is je favoriete windrichting?';
const oogkleurKey = 'Wat is je oogkleur?';
const huisdierKey = 'Wat is je favoriete soort huisdier?';
const zuivelKey = 'Wat is je favoriete zuivelproduct?';

fetchData(dataset).then((data) => {
    console.log("data fetched");

    const windRichting = parseWindrichting(data, windrichtingKey);
    const oogKleur = parseOogkleuren(data, oogkleurKey);
    const huisDier = parseHuisdieren(data, huisdierKey);
    const zuivel = parseZuivel(data, zuivelKey);



    let cleanedData = []

    for (let i = 0; i < data.length; i++) {
        cleanedData.push({
            fav_windrichting: windRichting[i],
            oogkleur: oogKleur[i],
            fav_huisdier: huisDier[i],
            fav_zuivel: zuivel[i]
        })
    }

    console.table(cleanedData);

    renderWindrichtingen(windRichting);
    renderZuivel(zuivel);
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

function parseZuivel(arr, key) {
    var result = arr.map((item) => (item[key]).toString().toLowerCase().replace('!', '').replace(',', '').replaceAll(' ', '_'));
    return result;
}

function renderWindrichtingen(data) {

    const container = document.querySelector("section:first-of-type ul");
    for (let i = 0; i < data.length; i++) {
        container.insertAdjacentHTML('beforeend', `<li><img class="${data[i]}"src="../resources/${data[i]}.png"></img></li>`);

        //source: https://www.kindpng.com/imgv/himRobb_green-arrows-png-green-arrow-left-png-transparent/
    }
}

function renderZuivel(data) {

    const container = document.querySelector("section:last-of-type ul");
    for (let i = 0; i < data.length; i++) {
        container.insertAdjacentHTML('beforeend', `<li class="${data[i]}">${data[i]}</li>`);
    }
}