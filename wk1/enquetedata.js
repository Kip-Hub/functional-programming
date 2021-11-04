const dataset = '../data/tech-track-dataset.json'; // Local json file 
const windrichtingKey = 'Wat is je favoriete windrichting?'; // Questionaire questions function as keys to obtain the values of
const oogkleurKey = 'Wat is je oogkleur?';
const huisdierKey = 'Wat is je favoriete soort huisdier?';
const zuivelKey = 'Wat is je favoriete zuivelproduct?';

fetchData(dataset).then((data) => { // Call fetchData() function with the given json file
    const windRichting = parseWindrichting(data, windrichtingKey); // 
    const oogKleur = parseOogkleuren(data, oogkleurKey);
    const huisDier = parseHuisdieren(data, huisdierKey);
    const zuivel = parseZuivel(data, zuivelKey);

    let cleanedData = [] // Create empty array for results to be placed in

    for (let i = 0; i < data.length; i++) { // Loops through the amount of records in the json
        cleanedData.push({
            fav_windrichting: windRichting[i], // For each record it pushes its value along with a key to the previously created empty array 
            oogkleur: oogKleur[i],
            fav_huisdier: huisDier[i],
            fav_zuivel: zuivel[i]
        })
    }

    console.table(cleanedData); // The cleaned data is then shown in a table in the console

    renderWindrichtingen(windRichting); // Calls the renderWindrichtingen function with the cleaned/parsed data of windRichting as an arg
    renderZuivel(zuivel); // Calls the renderZuivel function with the cleaned/parsed data of zuivel as an arg
});

async function fetchData(url) {
    try {
        const response = await fetch(url); // Wait for the url to be fetched
        const data = await response.json(); // Wait for the data response to be given in json for it then to be returned and used
        return data;
    } catch {
        console.log("Can't fetch data");
    }
};

function parseWindrichting(arr, key) {
    let result = arr.map((item) => (item[key]).toString().toLowerCase()); // Function that makes all the values of the given key lowercase and returns it
    return result;
};

function parseOogkleuren(arr, key) {
    let result = arr.map((item) => (item[key]).toString().toLowerCase().replaceAll('-', ',').replaceAll(' , ', ','));
    return result;
};

function parseHuisdieren(arr, key) {
    let result = arr.map((item) => (item[key]).toString().toLowerCase().replaceAll(' of ', ',').replaceAll(' ', '_'));
    return result;
};

function parseZuivel(arr, key) {
    let result = arr.map((item) => (item[key]).toString().toLowerCase().replaceAll('!', '').replaceAll(',', '').replaceAll(' ', '_')); // Function that removes or replaces some symbols of all values of a given key
    return result;
};

function renderWindrichtingen(data) {

    const container = document.querySelector("section:first-of-type ul"); // Select the containing element in DOM
    for (let i = 0; i < data.length; i++) { // Creates a list item with an image inside for every value thats given, the value itself is added as a class for styling
        container.insertAdjacentHTML('beforeend', `<li><img class="${data[i]}"src="../resources/${data[i]}.png"></img></li>`);
    }
};

function renderZuivel(data) {

    const container = document.querySelector("section:last-of-type ul"); // Select the containing element in DOM
    for (let i = 0; i < data.length; i++) { // Creates a list item for every value thats given, the value itself is added as a class for styling
        container.insertAdjacentHTML('beforeend', `<li class="${data[i]}">${data[i]}</li>`);
    }
};

//image source: https://www.kindpng.com/imgv/himRobb_green-arrows-png-green-arrow-left-png-transparent/