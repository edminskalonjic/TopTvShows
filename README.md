# TopTvShows


Installing dependecies and deploying the application:


1)Clone this repository using 

> git clone https://github.com/edminskalonjic/TopTvShows.git 

2)Change the working directory to TopTvShows, and install dependecies on server (using npm run install-server) :

> cd TopTvShows

> npm run install-server

3)Install dependecies on client:

>npm run install-client

3)Run the app:

>npm run dev



Application description:

-Collection of data are fetched from the themoviedb.org API (documentation on link https://developers.themoviedb.org/3),

-Collection of data fetched from themoviedb.org API (Top 20 rated tv shows) will be stored in a json file(jsonData/tvShows.json),

-User can login using his Google Account(Google OAuth)

-User can watch and modify tv shows after he has logged in,

-User can edit name, description and IMDB rate of the show,

-User can delete a show,

-User can create a json file on disk (tvshows.json will be created in C:\JSON directory)



Technologies/libraries used in this project:

React/Redux, Redux Form, react-router-dom 

Google OAuth authorization,

MongoDB, mongoose for storing new users,

Node/Express API,

nodejs file-system for writing, storing, and reading files,

materializecss for css styling
