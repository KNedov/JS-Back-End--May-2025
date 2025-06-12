import { Schema,model } from "mongoose";  
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],

    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
})

userSchema.pre('save', async function(){
const salt=await bcrypt.genSalt(10)
this.password= await bcrypt.hash(this.password, salt);
})

const User = model('User', userSchema);
export default User;