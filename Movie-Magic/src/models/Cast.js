import { Schema,model } from "mongoose";

const validCharacterPattern = /^[a-zA-Z0-9]+$/;
const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: [validCharacterPattern, 'Name can only contain alphanumeric characters, digits and whitespace are allowed'],
        minlength: [5, 'Name must be at least 5 characters long'],
    },
    age:{
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age must be at least 1'],
        max: [120, 'Age cannot exceed 120'],
    },
    born: {
        type: String,
        required: [true, 'Born is required'],
        validate: [validCharacterPattern, 'Born can only contain alphanumeric characters, digits and whitespace are allowed'],
        minlength: [10, 'Born must be at least 10 characters long'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: [/^https?:\/\//, 'Image URL must be a valid URL'],
    },
    
});

const Cast = model('Cast', castSchema);
export default Cast;
