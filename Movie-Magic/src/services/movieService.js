
import { v4 as uuid} from "uuid";

import Movie from "../models/Movie.js";
import Cast from "../models/Cast.js";


export default {
    async getAll(filter = {}) {
        let result = await Movie.find({}).lean();
        if (filter.search) {
            result = result.filter(m => m.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
        if(filter.genre) {
            result=result.filter(m=>m.genre.toLowerCase()===filter.genre.toLowerCase());
        }
        if(filter.year) {
            result=result.filter(m=>m.year.toString()===filter.year.toString());
        }
        return result;
    },
    createMovie(movieData) {
        const movie= new Movie(movieData);
        //Generate unique id
        
        movieData.id = uuid();
        //convert rating to number
        movieData.rating = Number(movieData.rating);
        //convert year to number
        movieData.year = Number(movieData.year);
        
        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId).populate('casts');
        return movie;
    },
    async attachCast(movieId, castId) {
        const movie = await this.getOne(movieId);

        movie.casts.push(castId);
        return movie.save();
        
    },
    // async getCasts(movieId) {
    //     const movie = await this.getOne(movieId);
       

    //     const casts= await Cast.find({_id:{$in:movie.casts}})
    //     return casts;
    // }
    }