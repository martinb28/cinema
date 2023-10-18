
//API para el index//

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=clint%20eastwood', {
    "method": "GET",
    "headers": {
        'X-RapidAPI-Key': '6331b0a8abmshd156658c7dd8d4bp1bc4dbjsn8e61209b98c8',
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