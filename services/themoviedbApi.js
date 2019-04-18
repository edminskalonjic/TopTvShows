const axios = require('axios');
const KEY = 'b8acafb410f148b2ec849b40b7bb9b00';

module.exports= axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params :{
        page:1,
        api_key:KEY   
    }
});