import User from "../models/User.js";

export default{
   register(data) {
    return User.create(data);
   }
}