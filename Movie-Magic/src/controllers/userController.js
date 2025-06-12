import { Router } from "express";

const userController = Router();

//TODO: Implement user-related routes
userController.get("/register", (req, res) => {
    res.send("User registration page");
});
export default userController;