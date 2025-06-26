import courseService from "../Services/courseService.js";
import userService from "../Services/userService.js";


   export async function  getSignedUsers(courseId) {   
    const signedUsers= await courseService.getById(courseId)
   
  
    
    const users= await  userService.getUsernameById(signedUsers.signUpList)
     let usernames = users.join(', ')
    return usernames;
  
}

export async function getOwnerName(ownerId) {


   const user= await userService.getEmailsById([ownerId]) 
  
   
      let usernames = user.join('')
    return usernames;

  
  
  
 
  
  
  
}

