const fs = require('fs');
const path = require("path");
const myPath = path.resolve('jsonData', 'tvShows.json');
const requireLogin= require('../middlewares/requireLogin');

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
        
        fs.copyFile(myPath, pathForSaving, (err) =>{
            console.log('File was copied');
        });
        resp.redirect('/tvshows');        
    })
}