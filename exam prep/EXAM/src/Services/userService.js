import User from '../models/User.js'

import bcrypt from 'bcrypt'

import { generateToken } from '../utils/userUtils.js';
export default {
   async register(userData){
    console.log(userData);
    
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
          throw new Error(error.message);
            
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
   
   
   throw new Error(error.message);
   
}
    },    async  getNameById(userId) {
try {
        
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error("User not found"); 
        }
        
       
        const fullName = `${user.firstName} ${user.lastName}`;
        
        return fullName;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
},
    async  getUsernameById(userIds) {
  try {
  
   
   
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return [];
    }

    
    const users = await User.find({
      _id: { $in: userIds }
    }).select('username'); 

    
    return users.map(user => user.username);
  } catch (error) {
    console.error('Error fetching usernames:', error);
    return [];
  }
},

}

