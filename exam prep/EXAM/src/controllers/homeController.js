import {Router} from 'express'
import carService from '../Services/carService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

try {
    const cars= await carService.getLatest()
        // Last 3 cars
    
   
    
        res.render('home',{cars: cars})
} catch (err) {
        console.error('Database error:', err.message); 
        res.status(404).render('notFound');
}
})

homeController.get('/about',async (req, res) => {
   
    res.render('about')
})
export default homeController