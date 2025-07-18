import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use(homeController);
routes.use('/users',userController)
routes.all('*url',(req, res) => {
    res.render('notFound')
})



export default routes;
