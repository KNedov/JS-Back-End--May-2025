import {Router} from 'express'
import recipeService from '../Services/recipeService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

const recipes= await recipeService.getLatest()
    // Last 3 products



    res.render('home',{recipes: recipes})
})

homeController.get('/search',async (req, res) => {
    const filter= req.query
     
    const recipes= await recipeService.getAll(filter)
    
    res.render('search',{recipes:recipes})
})
export default homeController