fetch('/data/tech-track-dataset.json')
    .then(results => results.json())
    // .then(data =>
    //     data.forEach(function(key, value) {
    //         console.log(key, value)
    //     })
    // )
    .then(data => {
        data.forEach(object => {
            console.log(object['Wat is je favoriete windrichting?'])
        })
    })