const dataset = 'https://www.episodate.com/api/most-popular?page=4'; // API url - 1 page includes 20 tv shows


fetchData(dataset) //fetchdata() is called over the API
    .then((data) => {
        data.tv_shows.map((obj) => { //
            if (obj.status == 'Ended') { // Filters the response data by the status of the TV show

                const nameWithoutDots = removeDots(obj.name); // Create variables to assign the values of the returned data
                const showName = removeCommas(nameWithoutDots);
                const startDate = fixDate(obj.start_date);
                const status = removeCaps(obj.status);
                const networkWithoutCaps = removeCaps(obj.network); // Call cleaning functions on the value of returned data
                const networkWithoutPlus = removePlus(networkWithoutCaps); // Creates 'multiple' variables for values inbetween stages of cleaning (could probably be done differently)
                const network = removeSpaces(networkWithoutPlus);
                const showImg = obj.image_thumbnail_path;

                renderShows(showName, startDate, status, network, showImg); // renderShows() is called with the cleaned up data as args
            }
        })
    });

function renderShows(name, date, status, network, img) {
    const container = document.querySelector("section:first-of-type"); // Selects the containing element in the DOM
    const article = document.createElement("article"); // Creates a new article in the DOM
    container.appendChild(article); // Adds the article to the list of children of the parent
    article.insertAdjacentHTML('beforeend', `<h2>${name}</h2>`); // Inserts an h2 element within the appended article, with the name given as an arg in the function
    article.insertAdjacentHTML('beforeend', `<p>${network}</p>`);
    article.insertAdjacentHTML('beforeend', `<p>${status}</p>`);
    article.insertAdjacentHTML('beforeend', `<p>${date}</p>`);
    article.insertAdjacentHTML('beforeend', `<img src="${img}">`); // Inserts an image elemement within the appended article, uses the img
};

async function fetchData(url) {
    try {
        const response = await fetch(url); // Wait for the url to be fetched
        const data = await response.json(); // Wait for the response to be data response to be given in json
        return data;
    } catch {
        console.log("Can't fetch data");
    }
};

function shortenName(data) { // Unused function that shortens the name of the tvshow
    let result = data.slice(0, data.length - 15);
    return result;
}

function removeCaps(data) { // Function that makes all text its called on lowercase
    let result = data.toLowerCase();
    return result;
};

function fixDate(data) { // Function that removes the months and days from the date, as only the year is relevant
    let result = data.slice(0, data.length - 6)
    return result;
};

function removeSpaces(data) { // Function that replaces spaces with underscores
    let result = data.replaceAll(' ', '_');
    return result;
};

function removeDots(data) { // Function that removes dots
    let result = data.replaceAll('.', '');
    return result;
};

function removeCommas(data) { // Function that removes commas
    let result = data.replaceAll(/'/g, '');
    return result;
};

function removePlus(data) { // Function that removes + (used for disney+ network)
    let result = data.replaceAll('+', ' plus');
    return result;
};