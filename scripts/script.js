fetch('./data/tech-track-dataset.json')
    .then(results => results.json())
    .then(console.log);