import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
           minLength: [2,'Title should be at least 2 characters'],
    },
    ingredients: {
        type: String,
        required: true,
           minLength: [10,'Ingredients should be at least 10 characters'],
           minLength: [200,'Ingredients should be at max 200 characters'],
    },
    instructions: {
        type: String,
        required: true,
         minLength: [10,'Instructions should be at least 2 characters'],
       
    },
    description: {
        type: String,
        required: true,
         minLength: [10,'Description should be at least 10 characters'],
           minLength: [100,'Description should be at max 50 characters'],
    },
    image: {
        type: String,
        required: true,
        validate: [/^Https?:\/\//,'Invalid image Url']
    },

    recommendList: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    owner: {
        type: Types.ObjectId,
        ref: "User",
    },
});
const Recipe = model("Recipe", recipeSchema);

export default Recipe;
