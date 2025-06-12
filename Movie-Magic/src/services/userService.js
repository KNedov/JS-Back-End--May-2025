import User from "../models/User";

export default{
   register(email, password) {
    return User.create({ email, password });
   }
}