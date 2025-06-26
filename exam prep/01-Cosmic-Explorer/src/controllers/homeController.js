import { Router } from "express";
import planetService from "../Services/planetService.js";
// TODO:

const homeController = Router();
homeController.get("/", (req, res) => {
    res.render("home");
});
homeController.get("/catalog", async (req, res) => {
    const planets = await planetService.getAll();

    res.render("catalog", { planets: planets });
});

homeController.get("/search", async (req, res) => {
    const filter = req.query;
    const planets = await planetService.getAll(filter);
    res.render("search", { planets: planets });
});


export default homeController;
