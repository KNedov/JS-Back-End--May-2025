import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const carsSchema = new Schema({
    model: {
        type: String,
        required: true,
        minLength: [2, "Model should be at least 2 characters"],
    },
    manufacturer: {
        type: String,
        required: true,
        minLength: [3, "Manufacturer should be at least 3 characters"],
    },
    engine: {
        type: String,
        required: true,
        minLength: [3, "Engine should be at least 3 characters"],
    },topSpeed: {
        type: Number,
        required: true,
        min:[2,'TopSpeed should be min 2']
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, "Invalid image Url"],
    },
    description: {
        type: String,
        required: true,
         minLength: [5, "Description should be at least 5 characters"],
         maxLength: [500,'Description shuld be at maximum 500 characters']
    },
    

    likes: [
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
const Car = model("Car", carsSchema);

export default Car;
