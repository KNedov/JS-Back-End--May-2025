import { create } from "express-handlebars";
import { v4 as uuid} from "uuid";

import Movie,{movies} from "../models/Movie.js";


export default {    
    getAll(filter={}) {
        let result=movies.slice();
        if(filter.search) {
            result=result.filter(m=>m.title.toLowerCase().includes(filter.search.toLowerCase()));
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
    getOne(movieId) {
        const movie = movies.find((m) => m.id === movieId);
        return movie;
    }
}