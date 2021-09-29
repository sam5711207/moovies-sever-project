const request = require("request-promise")
const poeple = require("../actors_list")  //מערך של שמות שחקנים 

//id לפי המערך השמות של השחקנים לקבל מערך של 
actorsId = async (req, res) => {
    let actorsIdArray = poeple.map(async actorName => {
        const uri = `https://api.themoviedb.org/3/search/person?api_key=7b1152a1222f2893d32b8d84ae5d9abc&search_type=ngram&query=${actorName}`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            return await result.results[0].id
        } catch (err) {
            console.error(err);
        }
    })
    return Promise.all(actorsIdArray); //על כל הרשימה  map בשביל לחכות לסיים את ה 
}

actorsMovies = async (req, res) => {
    let actorsIdArray = await actorsId();

    let i = 0;
    let moviesArray = actorsIdArray.map(async actorId => {
       let actorName = poeple[i ++]
        const uri = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            let movieId = result.cast.map(movie => {
                return movie.id
            })
            // return await [{ Name: actorName, Moovies: title }]
            return await [{ Name: actorName, Moovies: movieId }]
        } catch (err) {
            console.error(err);
        }
    })
    return Promise.all(moviesArray); //על כל הרשימה  map בשביל לחכות לסיים את ה 
    // let moviesRes = await Promise.all(moviesArray)
    // res.send(moviesRes)
}

mervalMovies = async (req, res) => {
    let moviesArray = await actorsMovies();

    // let i = 0;
    let mervalsArray = moviesArray.map(async movie_id => {
    //    let actorName = poeple[i ++]
        const uri = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            if( result.homepage === "https://www.marvel.com/movies")
            return await [{ Name: actorName, Moovies: result.title }]
        } catch (err) {
            console.error(err);
        }
    })
    return Promise.all(moviesArray); //על כל הרשימה  map בשביל לחכות לסיים את ה 
    // let moviesRes = await Promise.all(moviesArray)
    // res.send(moviesRes)
}



bonus = async (req, res) => {
    let actorsIdArray = await actorsId();

    let i = 0;
    let moviesArray = actorsIdArray.map(async actorId => {
       let actorName = poeple[i ++]
        const uri = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            let characters = result.cast.map(movie => {
                return movie.character
            })
            return await [{ Name: actorName, character: characters }]
        } catch (err) {
            console.error(err);
        }
    })
    let moviesRes = await Promise.all(moviesArray)
    res.send(moviesRes)
}


module.exports = {
    actorsMovies,
    mervalMovies,
    bonus
}