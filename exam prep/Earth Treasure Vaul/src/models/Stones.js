import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const stoneSchema = new Schema({
    name: {
        type: String,
        required: true,
           minLength: [2,'name should be at least 2 characters'],
    },
    category: {
        type: String,
        required: true,
           minLength: [12,'category should be at least 3 characters'],
      
    },
    color: {
        type: String,
        required: true,
         minLength: [10,'Color should be at least 2 characters'],
       
    }, image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//,'Invalid image Url']
    }, location: {
        type: String,
        required: true,
        minLength:[5,'Location should be at least 5 characters'],
        maxLength:[15,'Location should be at maximum 15 characters']
        
    }, formula: {
        type: String,
        required: true,
        minLength:[3,'Formula should be at least 3 characters'],
        maxLength:[30,'Formula should be at maximum 30 characters']
       
    },
    description: {
        type: String,
        required: true,
         minLength: [10,'Description should be at least 10 characters'],
   
    },
   

    likedList: [
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
const Stone = model("Stone", stoneSchema);

export default Stone;
