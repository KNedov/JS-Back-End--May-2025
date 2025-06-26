import User from '../models/User.js'

import bcrypt from 'bcrypt'

import { generateToken } from '../utils/userUtils.js';
export default {
   async register(userData){
        // check if password are the same
        try {
            if (userData.password!==userData.rePassword){
                throw new Error("Password Mismatch!");
                
            }
    
            // check if user exists
            const user= await User.findOne({email: userData.email})
            if (user) {
                throw new Error ('User already exists!')
            }
    
            const newUser= await User.create(userData)
            const token= await generateToken(newUser)
            return token
        } catch (error) {
           if (error.message!=='Password Mismatch!'||error.message!=='User already exists!') {
               throw new Error("Sever is Down !");
                
            }
            throw new Error(error);
            
        }
     
        
    },

    async login(email,password){
        try {
            const user= await User.findOne({email})
            if (!user) {
                throw new Error ('No such user exists!')
            }
    
            const isValid= await bcrypt.compare(password,user.password)
            if (!isValid) {
                throw new Error("Invalid password !");
                
            }
            // generate token
           const token= await generateToken(user)
            return token
        } catch (error) {
    const allowedMessages = ['No such user exists!', 'Invalid password !'];
    if (!allowedMessages.includes(error.message)) {
        throw new Error("Server is Down");
        
    }
   throw new Error(error.message);
   
}
    }
}

