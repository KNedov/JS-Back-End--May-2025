import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, "Title should be at least 5 characters"],
    },
    type: {
        type: String,
        required: true,
        minLength: [3, "Type should be at least 3 characters"],
    },
    certificate: {
        type: String,
        required: true,
        minLength: [2, "Description should be at least 2 characters"],
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, "Invalid image Url"],
    },
    description: {
        type: String,
        required: true,
         minLength: [10, "Description should be at least 10 characters"],
    },
    price: {
        type: Number,
        required: true,
        min:[0,'Price should be a positive Number']
    },

    signUpList: [
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
const Course = model("Course", courseSchema);

export default Course;
