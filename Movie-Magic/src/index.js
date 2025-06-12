import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { auth } from "./controllers/middlewares/authMiddlewares.js";
import routes from "./routes.js";


//Init express instance
const app = express();
//Add static middleware
//This middleware will serve static files from the public directory
app.use(express.static("./src/public"));

// add cookie parser middleware
app.use(cookieParser());

//Add body parser middleware
app.use(express.urlencoded());
// add auth middleware
 app.use(auth)
//Add and config view engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            showRating(rating) {
                //return "&#x2605".repeat(Math.floor(rating))
                return "★".repeat(Math.floor(rating));
            },
        },
        //Allow handlebars to use prototype methods and properties of the base mongoose document
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,

        },
    })
);

//connect database
try {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "magic-movies-may2025",
    });
    console.log("Connected to the database successfully!");
} catch (error) {
    console.log("Error connecting to the database:");
    console.log(error.message);
}

//Set default engine
app.set("view engine", "hbs");
//Set views directory
app.set("views", "./src/views");

//Import routes
app.use(routes)



//Start express web server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000.....");
    console.log("Press Ctrl+C to stop the server");
});
