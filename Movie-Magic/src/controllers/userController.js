import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

//TODO: Implement user-related routes
userController.get("/register", (req, res) => {
    res.render('user/register')
});

userController.post('/register',async (req, res) => {
    const data = req.body;
  
    
   
    // if (!email || !password || !rePassword) {
    //     return res.status(400).render('user/register', { error: 'All fields are required.' });
    // }
    // if (password !== rePassword) {
    //     return res.status(400).render('user/register', { error: 'Passwords do not match.' });
    // }
    await userService.register(data);
    res.redirect('/users/login');
})

userController.get("/login", (req, res) => {
    res.render('user/login')
});

userController.post('/login', async (req, res) => {
    const data = req.body;
   const token= await userService.login(data);
    res.redirect('/users/profile');
})
export default userController;