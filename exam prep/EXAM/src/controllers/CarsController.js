import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import carService from "../Services/carService.js";

import userService from "../Services/userService.js";
import { hasNoLikes } from "../utils/CarUtils.js";
import { transformCarData, transformCarData1 } from "../utils/userUtils.js";

const carController = Router();

carController.get("/posts", async (req, res) => {
    try {
        const cars = await carService.getAll();
      

        res.render("car/posts", { cars: cars });
    } catch (err) {
        res.status(404).render("notFound");
    }
});

carController.get("/create", isAuth, (req, res) => {
    res.render("car/create");
});

carController.post("/create", isAuth, async (req, res) => {
    const carData = req.body;
    const { ["car-model"]: model, ["top-speed"]: topSpeed, ...rest } = req.body;
    const transformedCarData = { model, topSpeed, ...rest };
    const ownerId = req.user.id;
    const user = req.user;
    console.log(transformedCarData);

    try {
        await carService.create(transformedCarData, ownerId, user);

        res.redirect("/cars/posts");
    } catch (err) {
        res.render("car/create", {
            error: getErrorMessage(err),
            car: carData,
        });
    }
});

carController.get("/:carId/details", async (req, res) => {
    try {
        const carId = req.params.carId;

        const car = await carService.getOne(carId);

        const isLiked = car.likes.includes(req.user?.id);

        const ownerId = car.owner;

        const likedByEmail = await carService.getEmailsWhoIsLiked(carId);
        //
        const notLikes = hasNoLikes(car.likes);

        

        const ownerName = await userService.getNameById(ownerId.toString());

        const isOwner = car.owner.equals(req.user?.id);

        // Render car page
        res.render("car/details", {
            car: car,
            isOwner,
            isLiked,
            ownerName,
            likedByEmail,
            notLikes: notLikes,
        });
    } catch (err) {
        res.status(404).render("notFound");
    }
});

carController.get("/:carId/like", isAuth, async (req, res) => {
    const carId = req.params.carId;
    const userId = req.user.id;

    try {
        await carService.Like(carId, userId);
        res.redirect(`/cars/${carId}/details`);
    } catch (err) {
        res.status(404).render("notFound", { error: getErrorMessage(err) });
    }
});
carController.get("/:carId/delete", isAuth, async (req, res) => {
    const carId = req.params.carId;
    const userId = req.user.id;

    // Delete car
    try {
        await carService.delete(carId, userId);
        // Redirect
        res.redirect("/cars/posts");
    } catch (error) {
        res.status(404).render("notFound", {
            error: "Only owner can delete this car",
        });
    }
});

carController.get("/:carId/edit", isAuth, async (req, res) => {
    // Get car by ID
    try {
        const carId = req.params.carId;

        // Get car
        const car = await carService.getOne(carId);
        const newCarData = transformCarData1(car);

        res.render("car/edit", { car: newCarData });
    } catch (err) {
        console.log(err.message);

        res.render("car/edit", { error: getErrorMessage(err), car: car });
    }
});

carController.post("/:carId/edit", isAuth, async (req, res) => {
    const carId = req.params.carId;

    const car = req.body;
    
    const transformedCar = transformCarData(car);

    const userId = req.user.id;

    try {
        await carService.edit(carId, transformedCar, userId);

        res.redirect(`/cars/${carId}/details`);
    } catch (err) {
        res.render("car/edit", { error: getErrorMessage(err), car: car });
    }
});

carController.get("/myPost", isAuth, async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;

        const createdPosts = await carService.getCreatedPosts(userId);
        
        
       

        await res.render("myPosts", {
            created: createdPosts,
            user,
        });
    } catch (err) {
        res.render("myPosts", { error: getErrorMessage(err) });
    }
});

export default carController;
