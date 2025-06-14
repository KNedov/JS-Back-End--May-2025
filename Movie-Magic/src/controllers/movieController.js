import express from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { getCategoryViewData } from "../utils/movieUtils.js";

const movieController = express.Router();
movieController.get("/create", (req, res) => {
    res.render("create");
});
movieController.post("/create", async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    await movieService.createMovie(newMovie, userId);

    res.redirect("/");
});
movieController.get("/:movieId/details", async (req, res) => {
    //get movieId from parameters
    const movieId = req.params.movieId;
    const userId = req.user?.id;

    const movie = await movieService.getOne(movieId);
    const isOwner = movie.owner?.equals(userId);

    // const casts = await movieService.getCasts(movieId);

    res.render("movie/details", { movie, isOwner });
});
movieController.get("/search", async (req, res) => {
    //Get query from the request
    const filter = req.query;

    const movies = await movieService.getAll(filter);
    res.render("search", { movies, filter });
});

movieController.get("/:movieId/attach", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    const casts = await castService.getAll({ exclude: movie.casts });

    res.render("movie/attach", { movie, casts });
});
movieController.post("/:movieId/attach", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});
movieController.get("/:movieId/delete", async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.deleteMovie(movieId);

    res.redirect("/");
});


movieController.get("/:movieId/edit", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    const isOwner = movie.owner?.equals(req.user.id);
    if (!isOwner) {
        return res.status(403).end();
    }
    const categoryData = getCategoryViewData(movie.category);
    res.render("movie/edit", { movie, categoryOptions: categoryData });
});
movieController.post("/:movieId/edit", async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user?.id;

    const updatedMovie = req.body;

    await movieService.editMovie(movieId, updatedMovie);

    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
