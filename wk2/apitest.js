const dataset = 'https://v2.jokeapi.dev/joke/Any';


fetchData(dataset).then((data) => {
    console.log(data);
    let setup = Object.values(data)[3];
    let delivery = Object.values(data)[4];
    showJoke(setup, delivery);
});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch {
        console.log("Can't fetch data");
    }
};

function showJoke(setup, delivery) {
    const container = document.querySelector("section");
    container.insertAdjacentHTML(
        'beforeend', `<h2>${setup}</h2>`
    );

    if (delivery.length > 0) {
        container.insertAdjacentHTML(
            'beforeend', `<p>${delivery}</p>`
        );

    }
};