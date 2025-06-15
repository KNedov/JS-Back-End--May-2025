import { v4 as uuid } from "uuid";

import Movie from "../models/Movie.js";

export default {
    async getAll(filter = {}) {
        let query = Movie.find();

        if (filter.search) {
            query = query.find({
                title: { $regex: new RegExp(filter.search, "i") },
            });
        }
        if (filter.genre) {
            query = query.find({ genre: filter.genre.toLowerCase() });
        }
        if (filter.year) {
            query = query.where("year").equals(filter.year);
        }
        return query;
    },
    createMovie(movieData, userId) {
        const movie = new Movie(movieData);
        movie.owner = userId;

        movieData.rating = Number(movieData.rating);

        movieData.year = Number(movieData.year);

        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId).populate("casts");
        return movie;
    },
    async attachCast(movieId, castId) {
        const movie = await this.getOne(movieId);

        movie.casts.push(castId);
        return movie.save();
    },
    async deleteMovie(movieId) {
        return Movie.findByIdAndDelete(movieId);
        await Movie.delete(movieId);
    },
    async editMovie(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    },
};
