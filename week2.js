const dataset = 'https://v2.jokeapi.dev/joke/Any';


fetchData(dataset).then((data) => {
    console.log(data);
    let setup = Object.values(data)[3];
    let delivery = Object.values(data)[4];
    showSetup(setup);
    showDelivery(delivery);
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

function showSetup(data) {

    const container = document.querySelector("body");
    // for (let i = 0; i < data.length; i++) {
    //     container.insertAdjacentHTML(
    //         'beforeend', `<p>${data[i]}</p>`
    //     );
    // }
    container.insertAdjacentHTML(
        'beforeend', `<h2>${data}</h2>`
    );
}

function showDelivery(data) {
    if (data.length > 1) {
        const container = document.querySelector("body");
        container.insertAdjacentHTML(
            'beforeend', `<p>${data}</p>`
        );

    }
}