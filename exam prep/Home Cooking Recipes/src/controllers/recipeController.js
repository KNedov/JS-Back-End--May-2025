import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import recipeService from "../Services/recipeService.js";


const recipeController = Router();

recipeController.get("/catalog", async (req, res) => {
    const recipes = await recipeService.getAll();

    res.render("recipe/index", { recipes: recipes });
});

recipeController.get("/create", isAuth, (req, res) => {
    res.render("recipe/create");
});

recipeController.post("/create", isAuth, async (req, res) => {
    const recipeData = req.body;
    const ownerId = req.user.id;

    try {
        await recipeService.create(recipeData, ownerId);

        res.redirect("/recipes/catalog");
    } catch (err) {
        res.render("recipe/create", {
            error: getErrorMessage(err),
            recipe: recipeData,
        });
    }
});

recipeController.get("/:recipeId/details", async (req, res) => {
  
    const recipeId = req.params.recipeId;

    
    
 
    const recipe = await recipeService.getOne(recipeId);
    // recipe.ingredients= recipe.ingredients.replaceAll(', ', ' / ')

    // check if recommended
    const isRecommended = recipe.recommendList.includes(req.user?.id)

    // Check if Owner
    const isOwner = recipe.owner.equals(req.user?.id);
    
    

  
    res.render("recipe/details", { recipe: recipe, isOwner,isRecommended });
});

recipeController.get("/:recipeId/recommend",isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user.id;
    
 

try {
   
    
        await recipeService.recommend(recipeId, userId);
        res.redirect(`/recipes/${recipeId}/details`);
} catch (err) {
    
    res.render('notFound',{error: getErrorMessage(err) })
}
});
recipeController.get('/:recipeId/delete',isAuth,async (req, res) => {
    const recipeId =req.params.recipeId
    const userId= req.user.id
    
 

 
    // Delete 
    try {
        await recipeService.delete(recipeId,userId)
        // Redirect
        res.redirect('/recipes/catalog')
    } catch (error) {
         res.render('notFound',{error: 'Only owner can delete this recipe'})
        
    }
})

recipeController.get('/:recipeId/edit',isAuth, async(req,res)=>{
// Get recipe by ID
const recipeId=req.params.recipeId

// Get product 
const recipe = await recipeService.getOne(recipeId)
// Render
res.render('recipe/edit',{recipe: recipe})
})

recipeController.post('/:recipeId/edit',isAuth,async (req, res) => {
    const recipeId= req.params.recipeId

    const recipeData= req.body
    const userId=req.user.id
    console.log(recipeData);
    

    try {
        await recipeService.edit(recipeId,recipeData,userId)

        res.redirect(`/recipes/${recipeId}/details`)
    } catch (err) {
        res.render('recipe/edit',{error: getErrorMessage(err),recipe: recipeData });
    }

})

export default recipeController;
