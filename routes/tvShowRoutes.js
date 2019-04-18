const fs = require('fs');
const path = require("path");
const requireLogin = require('../middlewares/requireLogin');

const myPath = path.resolve('jsonData', 'tvShows.json');
 
module.exports = app => {
 
    app.get('/api/tvshows', requireLogin, (req, resp) => {
        fs.readFile(myPath,(err, data) => {
            const dataBase = JSON.parse(data);
            resp.send(dataBase.tvShows);
        });
    });

    app.get('/api/tvshow/:id', requireLogin, (req, resp) => {
        const id = parseInt(req.params.id);
        fs.readFile(myPath,(err, data) => {
            const dataBase = JSON.parse(data);
            const tvShow = dataBase.tvShows.find(element => element.id === id);
            resp.send(tvShow);
        });
    })

    app.delete('/api/tvshow/:id', requireLogin, (req, resp) => {
        const id = parseInt(req.params.id);
        fs.readFile(myPath,(err, data) => {
            const dataBase = JSON.parse(data);
            const tvShowToDelete = dataBase.tvShows.find(element => element.id === id);
            const newTvShows = dataBase.tvShows.filter(tvShow => tvShow.id !== tvShowToDelete.id);
            dataBase.tvShows = newTvShows;
            const dataNew = JSON.stringify(dataBase, null, 2);
            fs.writeFile(myPath, dataNew, err => {
                console.log('Everything ok-Loaded Delete');
            });
            resp.send({type:'DELETE'});
        }); 
    });

    app.patch('/api/tvshow/:id', requireLogin, (req, resp) =>{
        const id = parseInt(req.params.id);
        fs.readFile(myPath,(err, data) => {
            const dataBase = JSON.parse(data);
            const tvShowToChangeIndex = dataBase.tvShows.findIndex(element => element.id === id);
            dataBase.tvShows[tvShowToChangeIndex].name = req.body.name;
            dataBase.tvShows[tvShowToChangeIndex].overview = req.body.overview;
            dataBase.tvShows[tvShowToChangeIndex].vote_average = req.body.vote_average;
            const dataNew = JSON.stringify(dataBase, null, 2);
            fs.writeFile(myPath, dataNew, err => {
                console.log('Everything ok-Loaded Put');
            });
            resp.send(dataBase.tvShows[tvShowToChangeIndex]);
        }); 
    })
}