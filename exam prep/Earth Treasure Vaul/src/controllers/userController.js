import { Router } from "express";
import userService from '../Services/userService.js'
import { AUTH_COOKIE_NAME } from "../config/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const userController = Router();

userController.get("/register",isGuest, (req, res) => {
    res.render('user/register',{pageTitle: 'Register'})
});

userController.post('/register',isGuest, async (req, res) => {
 const userData=req.body

try {
    const token =  await userService.register(userData)
    // attach token to cookie
    
    
    res.cookie(AUTH_COOKIE_NAME,token)
    // redirect to homepage
     res.redirect('/')
} catch (err) {
    res.render('user/register',{error:getErrorMessage(err),user:userData})
}
 
})

userController.get('/login',isGuest,(req, res) => {
    res.render('user/login')
})

userController.post('/login',isGuest,async (req, res) => {
    const {email,password}=req.body
// Call userService
  try {
    const token= await userService.login(email,password)
  //   Attach token to cookie
  res.cookie(AUTH_COOKIE_NAME,token)
  
      res.redirect('/')
  
  } catch (err) {
    res.render('user/login',{error:getErrorMessage(err),user:{email}})
  }

})

userController.get('/logout',isAuth,(req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME)
    res.redirect('/')
})

export default userController;
