import { Router } from "express";
import volcanoService from "../Services/volcanoService.js";
import { getTypeOptionsViewData } from "../utils/volcanoUtils.js";
// TODO:

const homeController = Router();
homeController.get("/", (req, res) => {
    res.render("home");
});
homeController.get("/catalog", async (req, res) => {
    const volcanoes = await volcanoService.getAll();

    res.render("catalog", { volcano: volcanoes });
});

homeController.get("/search", async (req, res) => {
    const filter = req.query;
    

    
    const typeOptions= getTypeOptionsViewData(filter?.typeVolcano)
   
   
      
    
    const volcanoes = await volcanoService.getAll(filter);
    
    
    
    res.render("search", { volcano: volcanoes,typeOptions,filter });
});


export default homeController;
