import {Schema,Types,model} from "mongoose";


const maxYearAllowed = new Date().getFullYear() + 5;
const movieSchema = new Schema({
    title:{
        type:String,
        required: [true,'Title is required'],
    },
    category:{
        type:String,
        required: [true,'Category is required'],
    },
    genre: {
        type:String,
        required: [true,'Genre is required'],
    },
    director: {
        type:String,
        required: [true,'Director is required'],
    },
    year: {
        type:Number,
        required: [true,'Year is required'],
        min:1970,
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
    },
    casts: [{
        type:Types.ObjectId,
        ref: 'Cast',
    }],
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
