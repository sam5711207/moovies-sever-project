const request = require("request-promise")
const people = require("../actors_list")  //מערך של שמות שחקנים 

//  לפי המערך השמות של השחקנים לקבל מערך של
// הסרטים ששחקו בהם 
mooviesArray = async (req, res) => {
    let i = 0
    let moviesIdArray = people.map(async actorName => {
        let name = people[i++]
        const uri = `https://api.themoviedb.org/3/search/person?api_key=7b1152a1222f2893d32b8d84ae5d9abc&search_type=ngram&query=${actorName}`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
            "rejectUnauthorized": false
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            let array = []
            result.results.forEach(element => {
                if (element.known_for_department === "Acting") {
                    let movies_id = element.known_for.map(media => {
                        array.push(media.id)
                        return media.id
                    });
                }
            })
            return await { Name: name, Moovies: array }
        } catch (err) {
            console.error(err);
        }
    })
    let moviesRes = await Promise.all(moviesIdArray)
    // res.send(moviesRes)
    return moviesRes
}




mervalMovies = async (req, res) => {
    let movArray = await mooviesArray();
    console.log(movArray, "popo")
    // let mervalsArray = [] 
    let mervalsArray = movArray.forEach(async actorsMoovies => {
        actorsMoovies.Moovies.map(async  movie_id => {
        const uri = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US&append_to_response=credits`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
            "rejectUnauthorized": false
        };
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            console.log("result", result)
            if (result.homepage.includes("https://www.marvel.com/movies")) {
                console.log("kkk", result.homepage)
                if ()
                return await { Name: actorName, Moovies: result.title }
            }
        } catch (err) {
            // console.error(err);
        }
    })
    // let mervalsArrayHome = await Promise.all(mervalsArray)
    // res.send(mervalsArrayHome)
})
let mervalsArrayHome = await Promise.all(mervalsArray)
    res.send(mervalsArrayHome)
}


module.exports = {
    // actorsMovies,
    mooviesArray,
    mervalMovies
}