import {Router} from 'express'
import stoneService from '../Services/stoneService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

const stones= await stoneService.getLatest()
    // Last 3 products



    res.render('home',{stones: stones})
})

homeController.get('/search',async (req, res) => {
    const filter= req.query
     
    const stones= await stoneService.getAll(filter)
    
    res.render('search',{stones:stones,filter})
})
export default homeController