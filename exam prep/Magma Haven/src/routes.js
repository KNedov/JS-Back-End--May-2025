import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import volcanoController from './controllers/volcanoControler.js'

// TODO: 
const routes = Router();

routes.use(homeController);
routes.use('/users',userController)
routes.use('/volcanoes',volcanoController)

routes.all('*url',(req, res) => {
    res.render('404')
})



export default routes;
