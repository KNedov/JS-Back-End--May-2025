import User from "../models/User.js";
import bcrypt from "bcrypt";
import {generateAuthToken} from "../utils/authUtils.js";

export default{
   async register(data) {
    const user= await User.create(data);
    const token = generateAuthToken(user);
    return token;
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

  const token= generateAuthToken(user);
   return token;
   },
}
