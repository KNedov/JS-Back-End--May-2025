import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import volcanoService from "../Services/volcanoService.js";
import { getTypeOptionsViewData } from "../utils/volcanoUtils.js";

// TODO:

const volcanoController = Router();

volcanoController.get("/create", isAuth, (req, res) => {
    const newVolcano = req.body;
    const typeOptionsViewData = getTypeOptionsViewData(newVolcano?.typeVolcano);

    res.render("volcano/create", { typeOptions: typeOptionsViewData });
});

volcanoController.post("/create", isAuth, async (req, res) => {
    // Get current userId
    const userId = req.user.id;

    // Get movie data
    const newVolcano = req.body;
    const typeOptionsViewData = getTypeOptionsViewData(newVolcano.typeVolcano);
    try {
        await volcanoService.create(newVolcano, userId);

        // Redirect to home page
        res.redirect("/catalog");
    } catch (err) {
        res.render("volcano/create", {
            error: getErrorMessage(err),
            volcano: newVolcano,
            typeOptions: typeOptionsViewData,
        });
    }
});

volcanoController.get("/:volcanoId/details", async (req, res) => {
    // Get product id
    const volcanoId = req.params.volcanoId;

    // Get product from db
    const volcano = await volcanoService.getOne(volcanoId);
    // planet.ingredients= planet.ingredients.replaceAll(', ', ' / ')

    // check if recommended
    const isVoted = volcano.voteList.includes(req.user?.id);

    // Check if Owner
    const isOwner = volcano.owner.equals(req.user?.id);

    // replace ingredients
    // product.ingredients = product.ingredients.replaceAll(', ',' / ')

    // Render product page
    res.render("volcano/details", {
        volcano: volcano,
        isOwner,
        isVoted: isVoted,
    });
});

volcanoController.get("/:volcanoId/vote", isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;

    try {
        await volcanoService.vote(volcanoId, userId);
        res.redirect(`/volcanoes/${volcanoId}/details`);
    } catch (err) {
        res.render("notFound", { error: getErrorMessage(err) });
    }
});
volcanoController.get("/:volcanoId/delete", isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;

    // Delete product
    try {
        await volcanoService.delete(volcanoId, userId);
        // Redirect
        res.redirect("/catalog");
    } catch (error) {
        res.render("notFound", { error: "Only owner can delete this volcano" });
    }
});

volcanoController.get("/:volcanoId/edit", isAuth, async (req, res) => {
    // Get product by ID
    const volcanoId = req.params.volcanoId;

    // Get product
    const volcano = await volcanoService.getOne(volcanoId);

    const typeViewOptions = getTypeOptionsViewData(volcano.typeVolcano);

    res.render("volcano/edit", { volcano, typeOptions: typeViewOptions });
});

volcanoController.post("/:volcanoId/edit", isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;

    const volcanoData = req.body;

    const userId = req.user.id;
    const typeViewOptions = getTypeOptionsViewData(volcanoData.typeVolcano);

    try {
        await volcanoService.edit(volcanoId, volcanoData, userId);

        res.redirect(`/volcanoes/${volcanoId}/details`);
    } catch (err) {
        res.render("volcano/edit", {
            error: getErrorMessage(err),
            volcano: volcanoData,
            typeOptions: typeViewOptions,
        });
    }
});

export default volcanoController;
