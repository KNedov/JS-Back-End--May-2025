
import userService from "../Services/userService.js";




export async function getOwnerName(ownerId) {
   

   const user= await userService.getNameById([ownerId]) 
  
   
      let usernames = user.join('')
    return usernames;


}
export function hasNoLikes(likes) {
  
    return !Array.isArray(likes) || likes.length === 0;
}

