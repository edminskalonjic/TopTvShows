const themoviedbApi = require('./services/themoviedbApi');
const fs = require('fs');
 
module.exports = () =>{
    themoviedbApi.get('/tv/top_rated').then(response => {
        const tvShows = response.data.results;
        const dataBase = {
            "tvShows": tvShows
        };
        const data = JSON.stringify(dataBase, null, 2);
        fs.writeFile('./jsonData/tvShows.json', data, err => {
            if (err){
                console.log(err);
                throw err;
            }
            console.log('JSON database successfully loaded');
        });
    });
}

