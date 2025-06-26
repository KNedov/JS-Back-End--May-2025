import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import courseService from "../Services/courseService.js";
import { getOwnerName, getSignedUsers } from "../utils/courseUtils.js";

const courseController = Router();

courseController.get("/catalog", async (req, res) => {
    try {
        const courses = await courseService.getAll();

        res.render("course/catalog", { courses: courses });
    } catch (err) {
        res.status(404).render("notFound");
    }
});

courseController.get("/create", isAuth, (req, res) => {
    res.render("course/create");
});

courseController.post("/create", isAuth, async (req, res) => {
    const courseData = req.body;
    const ownerId = req.user.id;
    const user = req.user;

    try {
        await courseService.create(courseData, ownerId, user);

        res.redirect("/courses/catalog");
    } catch (err) {
        res.render("course/create", {
            error: getErrorMessage(err),
            course: courseData,
        });
    }
});

courseController.get("/:courseId/details", async (req, res) => {
    // Get course id

    try {
        const courseId = req.params.courseId;

        // Get course from db
        const course = await courseService.getOne(courseId);

        //

        // check if Signed
        const isSigned = course.signUpList.includes(req.user?.id);
        const signedUsers = await getSignedUsers(courseId);
        const ownerId = course.owner;
        const ownerEmail = await getOwnerName(ownerId);
        
        const isOwner = course.owner.equals(req.user?.id);
        

        // replace ingredients
        // course.ingredients = course.ingredients.replaceAll(', ',' / ')

        // Render course page
        res.render("course/details", {
            course: course,
            isOwner,
            isSigned: isSigned,
            signedUsers,
            email: ownerEmail,
        });
    } catch (err) {
        res.status(404).render("notFound");
    }
});

courseController.get("/:courseId/sign", isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    try {
        await courseService.sign(courseId, userId);
        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
        res.status(404).render("notFound", { error: getErrorMessage(err) });
    }
});
courseController.get("/:courseId/delete", isAuth, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    // Delete course
    try {
        await courseService.delete(courseId, userId);
        // Redirect
        res.redirect("/courses/catalog");
    } catch (error) {
        res.status(404).render("notFound", {
            error: "Only owner can delete this course",
        });
    }
});

courseController.get("/:courseId/edit", isAuth, async (req, res) => {
    // Get course by ID
    try {
        const courseId = req.params.courseId;

        // Get course
        const course = await courseService.getOne(courseId);
        // Render
        console.log(course.title);
        
        res.render("course/edit",  {course} );
    } catch (err) {
        console.log(err.message);
        
       res.render('course/edit',{error: getErrorMessage(err),course: course });
    }
});

courseController.post("/:courseId/edit", isAuth, async (req, res) => {
    const courseId = req.params.courseId;

    const course = req.body;
    const userId = req.user.id;

    try {
        await courseService.edit(courseId, course, userId);

        res.redirect(`/courses/${courseId}/details`);
    } catch (err) {
       res.render('course/edit',{error: getErrorMessage(err),course: course });
    }
});

courseController.get("/profile", isAuth, async (req, res) => {
    try {
        const user = req.user;
        const userId = req.user.id;

        const createdCourses = await courseService.getCreatedCourses(userId);
        const signedForCourse = await courseService.getSignedCourse(userId);
      
        await res.render("profile", {
            created: createdCourses,
            signed: signedForCourse,
            user,
        });
    } catch (err) {
        res.render('profile',{error: getErrorMessage(err)});
    }
});

export default courseController;
