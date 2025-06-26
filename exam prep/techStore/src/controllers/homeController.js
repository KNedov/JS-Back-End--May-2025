import {Router} from 'express'
import productService from '../Services/productService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

try {
    const products= await productService.getLatest()
        // Last 3 products
    
    
        res.render('home',{products})
} catch (err) {
        console.error('Database error:', err.message); 
        res.status(404).render('notFound');
}
})

homeController.get('/about',async (req, res) => {
   
    res.render('about')
})
export default homeController