import {Router} from 'express'
import courseService from '../Services/courseService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

try {
    const courses= await courseService.getLatest()
        // Last 3 courses
    
   
    
        res.render('home',{courses})
} catch (err) {
        console.error('Database error:', err.message); 
        res.status(404).render('notFound');
}
})

homeController.get('/about',async (req, res) => {
   
    res.render('about')
})
export default homeController