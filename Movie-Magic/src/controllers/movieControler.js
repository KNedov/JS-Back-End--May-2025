import express from 'express';
import movieService from '../services/movieService.js';

const movieController = express.Router();
movieController.get ('/create', (req, res) => {
  res.render('create');
});
movieController.post('/create',async (req, res) => {
  const newMovie = req.body;
  await movieService.createMovie(newMovie);

  res.redirect('/');
});
movieController.get('/:movieId/details', (req, res) => {
  //get movieId from parameters
  const movieId = req.params.movieId;
  //get movie from movieService
  //and pass it to the view
const movie=movieService.getOne(movieId)
  res.render('details', { movie });
});
movieController.get('/search', async (req, res) => {
  //Get query from the request
  const filter = req.query;
 

  const movies =  await movieService.getAll(filter);
  res.render('search',{movies,filter});
});

export default movieController;