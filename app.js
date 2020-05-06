const express = require('express');
const hbs = require('hbs');
const path = require('path');
const axios = require('axios');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// app.get('/:id', (request, response) => {
//   const id = request.params.id;
//   const url = 'http://www.omdbapi.com/?apikey=c90b8787&i=' + id;
//   axios
//     .get(url)
//     .then(result => {
//       const movie = result.data;
//       response.render('single', { movie });
//     })
//     .catch(error => {
//       console.log('There was an error loading response from api');
//       console.log(error);
//       response.send('There was an error processing your request.');
//     });
// });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      response.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log('There was an error loading response from api');
      console.log(error);
      response.send('There was an error processing your request.');
    });
});

app.get('/beers/:id', (request, response) => {
  const id = request.params.id;
  punkAPI
    .getBeer(id)
    .then(beerFromApi => {
      console.log('Beer from the api', beerFromApi);
      response.render('singleBeer', { beer: beerFromApi });
    })
    .catch(error => {
      console.log(error);
      response.send('There was an error processing your request.');
    });
});

app.get('/random-beers', (request, response) => {
  const id = request.params.id;
  punkAPI
    .getRandom()
    .then(beerFromApi => {
      console.log('Beer from the api', beerFromApi);
      response.render('random', { beer: beerFromApi });
    })
    .catch(error => {
      console.log(error);
      response.send('There was an error processing your request.');
    });
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
