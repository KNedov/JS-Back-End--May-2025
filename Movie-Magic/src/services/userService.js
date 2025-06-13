import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {jwtSecret}  from "../config/general.js";


export default{
   register(data) {
    return User.create(data);
   },
   async login(email,password) {
      // get user from database
      const user= await User.findOne( email );

      // check if user exists
  
      
   if (!user) {
      return new Error('no such user!');
   }


   // validate password
   const isValid = await bcrypt.compare(password, user.password);

   // return error if not valid
   if (!isValid) {
      return new Error('Invalid password!');
   }

   // if valid generate token

   const payload = {
      id: user.id,
      email: user.email
   };
   const token = jsonwebtoken.sign(payload, jwtSecret, { expiresIn: '2h' });


   return token;
   },
}