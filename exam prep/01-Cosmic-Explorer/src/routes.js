import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import planetController from './controllers/planetController.js'

// TODO: 
const routes = Router();

routes.use(homeController);
routes.use('/users',userController)
routes.use('/planets',planetController)

routes.all('*url',(req, res) => {
    res.render('404')
})



export default routes;
