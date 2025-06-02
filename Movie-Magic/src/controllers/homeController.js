import express from 'express';
import movieService from '../services/movieService.js';

const homeController=express.Router();


homeController.get('/', async (req, res) => {
    const movies= await movieService.getAll();
  res.render('home', { movies });
  
});
homeController.get('/about', (req, res) => {
  res.render('about');
});
homeController.get('/:movieId/details', (req, res) => {
  const movieId = req.params.movieId;
  const movie = movieService.getOne(movieId);
  res.render('details', { movie });
});
homeController.get('/search', (req, res) => {
  res.render('search');
});
export default homeController;
// This code defines a set of routes for an Express application using the Express Router.