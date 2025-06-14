import { v4 as uuid } from "uuid";

import Movie from "../models/Movie.js";
// import Cast from "../models/Cast.js";

export default {
    async getAll(filter = {}) {
        let query = Movie.find();
        // let result = await Movie.find({}).lean();
        if (filter.search) {
            query = query.find({
                title: { $regex: new RegExp(filter.search, "i") },
            });
        }
        if (filter.genre) {
            // result=result.filter(m=>m.genre.toLowerCase()===filter.genre.toLowerCase());
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

        //set owner

        //convert rating to number
        movieData.rating = Number(movieData.rating);
        //convert year to number
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
    // async getCasts(movieId) {
    //     const movie = await this.getOne(movieId);

    //     const casts= await Cast.find({_id:{$in:movie.casts}})
    //     return casts;
    // }
};
