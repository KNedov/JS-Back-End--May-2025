import { Schema,model } from "mongoose";


const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    age:{
        type: Number,
        required: [true, 'Age is required'],
        min: [12, 'Age must be at least 12'],
        max: [120, 'Age cannot exceed 120'],
    },
    born: {
        type: String,
        required: [true, 'Born is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: [/^https?:\/\//, 'Image URL must be a valid URL'],
    },
    
});

const Cast = model('Cast', castSchema);
export default Cast;
