const request = require("request-promise")
const poeple = require("../actors_list")  //מערך של שמות שחקנים 

//id לפי המערך השמות של השחקנים לקבל מערך של 
mooviesArray = async (req, res) => {
    let i = 0
    let moviesIdArray = poeple.map(async actorName => {
        let page = i ++
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
            let movie_id = result.results[0].known_for.map(movie => {
                if(movie.media_type === "movie"){
                return movie.id
             } 
            if(result.total_pages > 1) {
                
            }})
            return await movie_id
        } catch (err) {
            console.error(err);
        }
    })
    return Promise.all(moviesIdArray) //על כל הרשימה  map בשביל לחכות לסיים את ה 

    // let moviesRes = await Promise.all(moviesIdArray)
    // res.send(moviesRes)
}


// not actually
// actorsMovies = async (req, res) => {
//     let idArray = await actorsId();
//     let i = 0;
//     let moviesArray = idArray.map(async actorId => {
//        let actorName = poeple[i ++]
//         const uri = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=7b1152a1222f2893d32b8d84ae5d9abc&language=en-US`;
//         const options = {
//             method: "GET",
//             url: uri,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             "rejectUnauthorized": false
//         };
//         try {
//             let result = await request(options);
//             result = await JSON.parse(result)
//             let title = result.cast.map(movie => {
//                 return movie.id
//             })
//             return await [{ Name: actorName, Moovies: title }]
//         } catch (err) {
//             console.error(err);
//         }
//     })
//     let moviesRes = await Promise.all(moviesArray)
//     res.send(moviesRes)
    // return Promise.all(moviesArray) //על כל הרשימה  map בשביל לחכות לסיים את ה 
// }

mervalMovies = async (req, res) => {
    let movArray = await mooviesArray();
    console.log(movArray, "popo")
    let i = 0;
    // let y = 0
let mervalsArray = movArray.map(async movie_id => {
       let actorName = poeple[i ++]
    //    let oneMoveArray = movArray[y ++]
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
            if( result.homepage.includes("https://www.marvel.com/movies") ){
            console.log("kkk", result.homepage)
            return await [{ Name: actorName, Moovies: result.title }]
        }
        else{
            return;
        }
        } catch (err) {
            console.error(err);
        }
    })
    // return Promise.all(mervalsArray); //על כל הרשימה  map בשביל לחכות לסיים את ה 
    let mervalsArrayHome = await Promise.all(mervalsArray)
    res.send(mervalsArrayHome)
}


module.exports = {
    // actorsMovies,
    mooviesArray,
    mervalMovies
}