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
            console.log('Everything ok-Loaded');
        });
    });
}

