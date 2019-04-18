const fs = require('fs');
const path = require("path");
const requireLogin= require('../middlewares/requireLogin');

const pathToJsonFile = path.resolve('jsonData', 'tvShows.json');

module.exports = app => {
    app.get('/savejsonfile', requireLogin, (req, resp) => {
        const dir = '/JSON';
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
        }catch (err) {
            console.error(err)
        }
        const pathForSaving = path.resolve(dir, 'tvshows.json');
        
        fs.copyFile(pathToJsonFile, pathForSaving, (err) =>{
            if (err){
                console.log(err);
                throw err;
            }
            console.log('tvShows.json successfully copied to /JSON/tvShows.json');
        });
        resp.redirect('/tvshows');        
    })
}