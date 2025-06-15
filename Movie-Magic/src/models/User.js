import { Schema,model } from "mongoose";  
import bcrypt from 'bcrypt';
import { validate } from "uuid";

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minLength: [10, 'Email must be at least 10 characters long'],
        validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Please enter a valid email address'],
       

    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
})


userSchema.pre('save', async function(){

this.password= await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);
export default User;