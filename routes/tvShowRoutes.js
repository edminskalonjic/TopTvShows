const fs = require('fs');
const path = require("path");
const requireLogin = require('../middlewares/requireLogin');

const pathToJsonFile = path.resolve('jsonData', 'tvShows.json');
 
module.exports = app => {
    app.get('/api/tvshows', requireLogin, (req, resp) => {
        fs.readFile(pathToJsonFile,(err, data) => {
            if (err){
                console.log(err);
                throw err;
            }
            const dataBase = JSON.parse(data);
            resp.send(dataBase.tvShows);
        });
    });

    app.get('/api/tvshow/:id', requireLogin, (req, resp) => {
        const id = parseInt(req.params.id);
        fs.readFile(pathToJsonFile,(err, data) => {
            if (err){
                console.log(err);
                throw err;
            }
            const dataBase = JSON.parse(data);
            const tvShow = dataBase.tvShows.find(element => element.id === id);
            resp.send(tvShow);
        });
    })

    app.delete('/api/tvshow/:id', requireLogin, (req, resp) => {
        const id = parseInt(req.params.id);
        fs.readFile(pathToJsonFile,(err, data) => {
            if (err){
                console.log(err);
                throw err;
            } 
            const dataBase = JSON.parse(data);
            dataBase.tvShows = dataBase.tvShows.filter(tvShow => tvShow.id !== id);
            dataBase.tvShows.sort((a,b) => b.vote_average - a.vote_average);
            const dataNew = JSON.stringify(dataBase, null, 2);
            fs.writeFile(pathToJsonFile, dataNew, err => {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log('Tv show successfully deleted');
            });
            resp.send({type:'DELETE'});
        }); 
    });

    app.patch('/api/tvshow/:id', requireLogin, (req, resp) =>{
        const id = parseInt(req.params.id);
        fs.readFile(pathToJsonFile,(err, data) => {
            if (err){
                console.log(err);
                throw err;
            }
            const dataBase = JSON.parse(data);
            const tvShowToChangeIndex = dataBase.tvShows.findIndex(element => element.id === id);
            dataBase.tvShows[tvShowToChangeIndex].name = req.body.name;
            dataBase.tvShows[tvShowToChangeIndex].overview = req.body.overview;
            dataBase.tvShows[tvShowToChangeIndex].vote_average = req.body.vote_average;
            dataBase.tvShows.sort((a,b) => b.vote_average - a.vote_average);
            const dataNew = JSON.stringify(dataBase, null, 2);
            fs.writeFile(pathToJsonFile, dataNew, err => {
                if (err){
                    console.log(err);
                    throw err;
                }
                console.log('Tv show successfully updated');
            });
            resp.send(dataBase.tvShows[tvShowToChangeIndex]);
        }); 
    })
}