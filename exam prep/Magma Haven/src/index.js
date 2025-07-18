
import express from "express";
import handlebars from 'express-handlebars'
import routes from "./routes.js";
import initDatabase from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import viewHelpers from "./views/viewHelpers.js";
import expressSession from 'express-session'
import { SESSION_SECRET } from "./config/index.js";

// init express
const app = express();

// init database
await initDatabase()
// Setup static middleware
app.use(express.static("src/public"));

app.use (cookieParser())
// Use express session
app.use(expressSession({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false,httpOnly: true}
}))

// Use body parser
app.use(express.urlencoded())
// Config handlebars as view engine
app.engine('hbs',handlebars.engine({
    extname:'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault: true
    },
    helpers:viewHelpers
}))

app.set('views','src/views')

// Set handlebars as default view engine
app.set('view engine','hbs')
// Use auth middleware
app.use(auth)
// Add Routes
app.use(routes)

app.listen(3000, () =>
    
    console.log("Server is listening on http://localhost:3000 ...."));
