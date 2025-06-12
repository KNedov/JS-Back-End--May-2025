import User from "../models/User.js";

export default{
   register(data) {
    return User.create(data);
   }
   ,
   login(loginData) {
   // get user from database

   // check if user exists

   // validate password

   // return error if not valid

   // if valid generate token

   // return token
}}