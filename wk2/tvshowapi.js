const dataset = 'https://www.episodate.com/api/most-popular?page=1';


fetchData(dataset)
    .then((data) => {
        data.tv_shows.map((obj) => {
            const showName = removeCaps(obj.name);
            const startDate = obj.start_date;
            const network = obj.network;
            const showImg = obj.image_thumbnail_path;

            renderShows(showName, startDate, network, showImg);
        })
    })

function renderShows(name, date, network, img) {
    const container = document.querySelector("section:first-of-type");
    const article = document.createElement("article");
    container.appendChild(article);
    article.insertAdjacentHTML('beforeend', `<h2>${name}</h2>`);
    article.insertAdjacentHTML('beforeend', `<p>${date}</p>`);
    article.insertAdjacentHTML('beforeend', `<p>${network}</p>`);
    article.insertAdjacentHTML('beforeend', `<img src="${img}">`);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch {
        console.log("Can't fetch data");
    }
}

function removeCaps(data) {
    let result = data.toLowerCase();
    return result;
}

//todo: meer opschoon functies