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
            let moviesId = []
            result.results.forEach(async element => {
                if (element.known_for_department === "Acting") {
                   await element.known_for.forEach(async media => {
                        moviesId.push(media.id)
                    });
                }
            })
            console.log("jjj", moviesId)
            return await { Name: name, Moovies: moviesId }
        } catch (err) {
            console.error(err);
        }
    })
    return Promise.all(moviesIdArray)
}

mervalMovies = async (req, res) => {
    let moviesIdArray = await mooviesArray()
    console.log("ppppp", moviesIdArray)
    let i = 0;
    // let mervalArray = [];
   let mervalArray = moviesIdArray.map(async element => {
        let name = people[i++]
element.Moovies.map(async movie_id => { 
        const uri = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US&append_to_response=credits`;
        const options = {
            method: "GET",
            url: uri,
            headers: {
                'Content-Type': 'application/json'
            },
            "rejectUnauthorized": false
        };
        console.log(movie_id, "movie_id")
        try {
            let result = await request(options);
            result = await JSON.parse(result)
            let mooviesTitle = [];
            if(result.homepage.includes("www.marvel.com/movies")){
                console.log("lml")
               await mooviesTitle.push(result.title)
            }
            console.log("xxx", mooviesTitle)
            return await { Name: name, Moovies: mooviesTitle }
        } catch (err) {
            // console.error(err);
        }
    })})
    let mervalActorArray = await Promise.all(mervalArray)
    console.log("mmmm", mervalActorArray)
    res.send(mervalActorArray)
}



module.exports = {
    // actorsMovies,
    mooviesArray,
    mervalMovies
}