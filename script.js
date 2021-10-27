// fetch('/data/tech-track-dataset.json')
//     .then(results => results.json())
//     // .then(data =>
//     //     data.forEach(function(key, value) {
//     //         console.log(key, value)
//     //     })
//     // )
//     .then(data => {
//         data.map(object => {
//             console.log(object['Welke kleur kledingstukken heb je aan vandaag? (Meerdere antwoorden mogelijk natuurlijk...)'])
//         })
//     })

const dataset = '/data/tech-track-dataset.json';
const key = 'Wat is je favoriete windrichting?';

fetchData(dataset).then((data) => {
    console.log("data fetched");

    const windrichtingen = parseWindrichting(data, key);

    console.log(windrichtingen);
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

function parseWindrichting(Arr, key) {

    const final = Arr.map((item) => (item[key]).toString().toLowerCase());
    final.sort();
    return final;
    // return Arr;
}