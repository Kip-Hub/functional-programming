const dataset = 'https://v2.jokeapi.dev/joke/Any'; // API url - includes a singular random joke 
fetchData(dataset).then((data) => { // Data is fetched
    console.log(data);
    let setup = Object.values(data)[3]; // Get the value of the setup key of a joke
    let delivery = Object.values(data)[4]; // Get the value of the delivery key of a joke
    showJoke(setup, delivery); // showJoke() is called with the setup and delivery as args
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

function showJoke(setup, delivery) {
    const container = document.querySelector("section"); // Select the containing element in DOM
    container.insertAdjacentHTML('beforeend', `<h2>${setup}</h2>`); // Adds an h2 element to the container with the value of the given arg

    if (delivery.length > 0) { // If there is a delivery to the joke, it is displayed
        container.insertAdjacentHTML('beforeend', `<p>${delivery}</p>`); // Adds a p element to the container with the value of the given arg
    }
};