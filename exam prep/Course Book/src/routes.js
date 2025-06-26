import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import courseController from "./controllers/courseController.js";

const routes = Router();

routes.use(homeController);
routes.use('/users',userController)
routes.use('/courses',courseController)
routes.all('*url',(req, res) => {
    res.render('notFound')
})



export default routes;