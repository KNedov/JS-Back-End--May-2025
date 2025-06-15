import { Schema,model } from "mongoose";  
import bcrypt from 'bcrypt';
import { validate } from "uuid";

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // validate: {
        //     validator: async function(value) {
        //         const existingUser = await User.findOne({ email: value });
        //         if (existingUser) {
        //             throw new Error('Email already exists');
        //         }
        //     },
           
        // }

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