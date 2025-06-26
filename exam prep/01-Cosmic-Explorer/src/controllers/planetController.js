import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import planetService from "../Services/planetService.js";
import {
    getRingsOptionsViewData,
    getTypeOptionsViewData,
} from "../utils/planetUtils.js";

// TODO:

const planetController = Router();

planetController.get("/create", isAuth, (req, res) => {
    res.render("planet/create");
});

planetController.post("/create", isAuth, async (req, res) => {
    // Get current userId
    const userId = req.user.id;

    // Get movie data
    const newPlanet = req.body;

    try {
        // Save Movie
        await planetService.create(newPlanet, userId);

        // Redirect to home page
        res.redirect("/catalog");
    } catch (err) {
        res.render("planet/create", {
            error: getErrorMessage(err),
            planet: newPlanet,
        });
    }
});

planetController.get("/:planetId/details", async (req, res) => {
    // Get product id
    const planetId = req.params.planetId;

    // Get product from db
    const planet = await planetService.getOne(planetId);
    // planet.ingredients= planet.ingredients.replaceAll(', ', ' / ')

    // check if recommended
    const isLiked = planet.likedList.includes(req.user?.id);
    

    // Check if Owner
    const isOwner = planet.owner.equals(req.user?.id);

    // replace ingredients
    // product.ingredients = product.ingredients.replaceAll(', ',' / ')

    // Render product page
    res.render("planet/details", { planet: planet, isOwner, isLiked: isLiked });
});

planetController.get("/:planetId/like", isAuth, async (req, res) => {
    const planetId = req.params.planetId;
    const userId = req.user.id;

    try {
        console.log(planetId);
        console.log(userId);
        await planetService.like(planetId, userId);
        res.redirect(`/planets/${planetId}/details`);
    } catch (err) {
        res.render("notFound", { error: getErrorMessage(err) });
    }
});
planetController.get("/:planetId/delete", isAuth, async (req, res) => {
    const planetId = req.params.planetId;
    const userId = req.user.id;

    // Delete product
    try {
        await planetService.delete(planetId, userId);
        // Redirect
        res.redirect("/catalog");
    } catch (error) {
        res.render("notFound", { error: "Only owner can delete this planet" });
    }
});

planetController.get("/:planetId/edit", isAuth, async (req, res) => {
    // Get product by ID
    const planetId = req.params.planetId;

    // Get product
    const planet = await planetService.getOne(planetId);
      const typeOptionsViewData = getTypeOptionsViewData(planet.type);
    const ringsOptionsViewData = getRingsOptionsViewData(planet.rings);
    // Render
    res.render("planet/edit", {planet, typeOptions:typeOptionsViewData,ringsOptions:ringsOptionsViewData });
});

planetController.post("/:planetId/edit", isAuth, async (req, res) => {
    const planetId = req.params.planetId;

    const planetData = req.body;
  
    const userId = req.user.id;
    
    try {
        await planetService.edit(
            planetId,
            planetData,
            userId,
            );

        res.redirect(`/planets/${planetId}/details`);
    } catch (err) {
       
        
        res.render("planet/edit", {
            error: getErrorMessage(err),
            planet: planetData,
         
        });
    }
});

export default planetController;
