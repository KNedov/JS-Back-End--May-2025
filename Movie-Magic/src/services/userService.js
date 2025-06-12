import User from "../models/User.js";
import bcrypt from "bcrypt";

export default{
   register(data) {
    return User.create(data);
   },
   async login(email,password) {
      // get user from database
      const user= await User.findOne({ email });

      // check if user exists
   if (!user) {
      return new Error('no such user!');
   }


   // validate password

   // return error if not valid

   // if valid generate token

   // return token
}}