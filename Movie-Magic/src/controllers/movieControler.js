import express from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

const movieController = express.Router();
movieController.get ('/create', (req, res) => {
  res.render('create');
});
movieController.post('/create',async (req, res) => {
  const newMovie = req.body;
  await movieService.createMovie(newMovie);

  res.redirect('/');
});
movieController.get('/:movieId/details', async (req, res) => {
  //get movieId from parameters
  const movieId = req.params.movieId;
  //get movie from movieService
  //and pass it to the view
const movie=await movieService.getOne(movieId)
  res.render('movie/details', { movie });
});
movieController.get('/search', async (req, res) => {
  //Get query from the request
  const filter = req.query;
 

  const movies =  await movieService.getAll(filter);
  res.render('search',{movies,filter});
});

movieController.get('/:movieId/attach', async (req, res) => {
  const movieId = req.params.movieId;

  const movie = await movieService.getOne(movieId);

  const casts= await castService.getAll();
  console.log(casts)
  

  res.render('movie/attach', { movie, casts });

});

export default movieController;