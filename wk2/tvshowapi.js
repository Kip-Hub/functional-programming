const dataset = 'https://www.episodate.com/api/most-popular?page=1';


fetchData(dataset)
    .then((data) => {
        data.tv_shows.map((obj) => {
            if (obj.status == 'Running') {
            
                const nameWithoutDots = removeDots(obj.name);
                const showName = removeCommas(nameWithoutDots);
                const startDate = fixDate(obj.start_date);
                const status = removeCaps(obj.status);
                const networkWithoutCaps = removeCaps(obj.network);
                const network = removeSpaces(networkWithoutCaps);
                const showImg = obj.image_thumbnail_path;
    
                renderShows(showName, startDate, status, network, showImg);
            }
        })
    });

function renderShows(name, date, status, network, img) {
    const container = document.querySelector("section:first-of-type");
    const article = document.createElement("article");
    container.appendChild(article);
    article.insertAdjacentHTML('beforeend', `<h2>${name}</h2>`);
    article.insertAdjacentHTML('beforeend', `<p>${network}</p>`);
    article.insertAdjacentHTML('beforeend', `<p>${status}</p>`);
    article.insertAdjacentHTML('beforeend', `<p>${date}</p>`);
    article.insertAdjacentHTML('beforeend', `<img src="${img}">`);
};

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch {
        console.log("Can't fetch data");
    }
};

// function shortenName(data) {
//     let result = data.slice(0, data.length - 15);
//     return result;
// }

function removeCaps(data) {
    let result = data.toLowerCase();
    return result;
};

function fixDate(data) {
   let result = data.slice(0, data.length - 6)
   return result;
};

function removeSpaces(data) {
    let result = data.replaceAll(' ', '_');
    return result;
};

function removeDots(data) {
    let result = data.replaceAll('.', '');
    return result;
};

function removeCommas(data) {
    let result = data.replaceAll(/'/g, '');
    return result;
};