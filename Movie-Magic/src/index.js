import express from 'express';
import handlebars from 'express-handlebars';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieControler.js';



//Init express instance
const app = express();
//Add static middleware
//This middleware will serve static files from the public directory
app.use(express.static('./src/public'));

//Add body parser middleware
app.use(express.urlencoded());
//Add and config view engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers:{
        showRating(rating){
            //return "&#x2605".repeat(Math.floor(rating)) 
            return "★".repeat(Math.floor(rating)) 
        }
    }
}));
//Set default engine
app.set('view engine', 'hbs');
//Set views directory
app.set('views', './src/views');


app.use(homeController);
app.use('/movies',movieController)
app.all('*url', (req, res) => {
    res.status(404).render('404');
});

//Start express web server
app.listen(5000,() => {
    console.log('Server is listening on http://localhost:5000.....');
    console.log('Press Ctrl+C to stop the server');
});