import {Schema,Types,model} from "mongoose";
import { validate } from "uuid";


const maxYearAllowed = new Date().getFullYear() + 5;
const validCharacterPattern = /^[a-zA-Z0-9]+$/;
const movieSchema = new Schema({
    title:{
        type:String,
        required: [true,'Title is required'],
        validate: [validCharacterPattern, 'Title can only contain alphanumeric characters,digits and whitespace are allowed'],
        minlength: [5, 'Title must be at least 5 characters long'],

    },
    category:{
        type:String,
        required: [true,'Category is required'],
        enum: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
        message:(props) => `${props.value} is not a valid category. Valid categories are: tv-show, animation, movie, documentary, short-film.`,
      
    },
    genre: {
        type:String,
        required: [true,'Genre is required'],
        lowercase: true,
        validate: [validCharacterPattern, 'Genre can only contain alphanumeric characters,digits and whitespace are allowed'],
        minlength: [5, 'Genre must be at least 5 characters long'],
    },
    director: {
        type:String,
        required: [true,'Director is required'],
        validate: [validCharacterPattern, 'Director can only contain alphanumeric characters,digits and whitespace are allowed'],
        minlength: [5, 'Director must be at least 5 characters long'],
    },
    year: {
        type:Number,
        required: [true,'Year is required'],
        min:[1900,'Movie year must be at least 1900'],
        max:[maxYearAllowed, `Year cant be greater than ${maxYearAllowed}`],
    },
    imageUrl: {
        type:String,
        required: [true,'Image URL is required'],
        validate: [/^https?:\/\//, 'Image URL must be a valid URL'],
    },
    rating: {
        type:Number,
        required: [true,'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating cannot exceed 10'],
    },
    description: {
        type:String,
        required: [true,'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
        validate: [validCharacterPattern, 'Description can only contain alphanumeric characters,digits and whitespace are allowed'],
    },
    casts: [{
        type:Types.ObjectId,
        ref: 'Cast',
    }],
    owner:{
        type: Types.ObjectId,
        ref: 'User',
       
    },
})

 const Movie = model('Movie', movieSchema);
export default Movie;

// import fs from 'node:fs/promises'
// import{log} from 'node:console'
// import {v4 as uuid} from 'uuid'

// const movieJson= await fs.readFile('./src/database.json', 'utf-8')
// export const movies= JSON.parse(movieJson)



// export default class Movie{
//     constructor(data){
//         this.data = data;
//     }
   
//     async save(){
     
    
//         movies.push(this.data);
//         await fs.writeFile('./src/database.json', JSON.stringify(movies, null, 4));
//         return this.data;
//     }

// }
