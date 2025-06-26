import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import stoneService from "../Services/stoneService.js";


const stoneController = Router();

stoneController.get("/dashboard", async (req, res) => {
    const stones = await stoneService.getAll();

    res.render("stone/dashboard", { stones: stones });
});

stoneController.get("/create", isAuth, (req, res) => {
    res.render("stone/create");
});

stoneController.post("/create", isAuth, async (req, res) => {
    const stoneData = req.body;
    const ownerId = req.user.id;

    try {
        await stoneService.create(stoneData, ownerId);

        res.redirect("/stones/dashboard");
    } catch (err) {
        res.render("stone/create", {
            error: getErrorMessage(err),
            stone: stoneData,
        });
    }
});

stoneController.get("/:stoneId/details", async (req, res) => {
  
    const stoneId = req.params.stoneId;

    
    
 
    const stone = await stoneService.getOne(stoneId);
    // stone.ingredients= stone.ingredients.replaceAll(', ', ' / ')

    // check if recommended
    const isLiked = stone.likedList.includes(req.user?.id)
    let isNotLiked=true
    if (isLiked) {
       isNotLiked=false
        
    }

    // Check if Owner
    const isOwner = stone.owner.equals(req.user?.id);
    
    

  
    res.render("stone/details", { stone: stone, isOwner,isNotLiked: isNotLiked });
});

stoneController.get("/:stoneId/like",isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const userId = req.user.id;
    
 

try {
   
    
        await stoneService.Like(stoneId, userId);
        res.redirect(`/stones/${stoneId}/details`);
} catch (err) {
    
    res.render('notFound',{error: getErrorMessage(err) })
}
});
stoneController.get('/:stoneId/delete',isAuth,async (req, res) => {
    const stoneId =req.params.stoneId
    const userId= req.user.id
    
 

 
    // Delete 
    try {
        await stoneService.delete(stoneId,userId)
        // Redirect
        res.redirect('/stones/dashboard')
    } catch (error) {
         res.render('notFound',{error: 'Only owner can delete this stone'})
        
    }
})

stoneController.get('/:stoneId/edit',isAuth, async(req,res)=>{
// Get stone by ID
const stoneId=req.params.stoneId

// Get product 
const stone = await stoneService.getOne(stoneId)
// Render
res.render('stone/edit',{stone: stone})
})

stoneController.post('/:stoneId/edit',isAuth,async (req, res) => {
    const stoneId= req.params.stoneId

    const stoneData= req.body
    const userId=req.user.id
    console.log(stoneData);
    
    

    try {
        await stoneService.edit(stoneId,stoneData,userId)

        res.redirect(`/stones/${stoneId}/details`)
    } catch (err) {
        res.render('stone/edit',{error: getErrorMessage(err),stone: stoneData });
    }

})

export default stoneController;
