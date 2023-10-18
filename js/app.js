
//API para el index//

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=clint%20eastwood', {
    "method": "GET",
    "headers": {
        'X-RapidAPI-Key': '12e59f1c31msh1c139912d0de85fp1214c0jsnc0f33809d789',
 		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
})
.then (response =>  response.json())
.then(data => {    
    const arrayMovies = data.d
    arrayMovies.map((element) => {        
        const title = element.l
        const image = element.i.imageUrl
        const cast = element.s

        const poster = `
            <section>
                <img src="${image}" />
                <h2>${title}</h2>
                <small>${cast}</small>
            </section>
        `
        document.getElementById('container').innerHTML += poster
    })
})
.catch(err => {
    console.error(err);
});