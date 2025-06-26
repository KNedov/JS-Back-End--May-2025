import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import productService from "../Services/productService.js";


const productController = Router();

productController.get("/catalog", async (req, res) => {
    try {
        const products = await productService.getAll();
    
        res.render("product/catalog", { products: products });
    } catch (err) {
        res.status(404).render('notFound');
    }
});

productController.get("/create", isAuth, (req, res) => {
    res.render("product/create");
});

productController.post("/create", isAuth, async (req, res) => {
    const productData = req.body;
    const ownerId = req.user.id;

    try {
        
        
        await productService.create(productData, ownerId);

        res.redirect("/products/catalog");
    } catch (err) {
        res.render("product/create", {
            error: getErrorMessage(err),
            product: productData,
        });
    }
});

productController.get("/:productId/details", async (req, res) => {
    // Get product id
  try {
      const productId = req.params.productId;
  
      
      
      
      // Get product from db
      const product = await productService.getOne(productId);
      // 
  
      // check if recommended
      const isPreferred = product.preferredList.includes(req.user?.id)
  
      // Check if Owner
      const isOwner = product.owner.equals(req.user?.id);
      
      
  
      // replace ingredients
      // product.ingredients = product.ingredients.replaceAll(', ',' / ')
  
      // Render product page
      res.render("product/details", { product, isOwner,isPreferred });
  } catch (err) {
    res.status(404).render('notFound');
  }
});

productController.get("/:productId/prefer",isAuth, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;
 

try {
   
    
        await productService.prefer(productId, userId);
        res.redirect(`/products/${productId}/details`);
} catch (err) {
    
    res.status(404).render('notFound',{error: getErrorMessage(err) })
}
});
productController.get('/:productId/delete',isAuth,async (req, res) => {
    const productId =req.params.productId
    const userId= req.user.id
    
 

 
    // Delete product
    try {
        await productService.delete(productId,userId)
        // Redirect
        res.redirect('/products/catalog')
    } catch (error) {
         res.status(404).render('notFound',{error: 'Only owner can delete this product'})
        
    }
})

productController.get('/:productId/edit',isAuth, async(req,res)=>{
// Get product by ID
try {
    const productId=req.params.productId
    
    // Get product 
    const product = await productService.getOne(productId)
    // Render
    res.render('product/edit',{product})
} catch (err) {
    res.status(404).render('notFound');
}
})

productController.post('/:productId/edit',isAuth,async (req, res) => {
    const productId= req.params.productId

    const productData= req.body
    const userId=req.user.id
    console.log(productData);
    

    try {
        await productService.edit(productId,productData,userId)

        res.redirect(`/products/${productId}/details`)
    } catch (err) {
        res.render('product/edit',{error: getErrorMessage(err),product: productData });
    }

})

productController.get('/profile',isAuth,async (req, res) => {
   try {
     const user= req.user
     const userId= req.user.id
     
     
     const createdProducts= await productService.getCreatedProducts(userId)
     const preferredProducts= await productService.getPreferredProducts(userId)
 
    
    
     
     await res.render("profile",{created:createdProducts,preferred:preferredProducts,user})
   } catch (err) {
     res.render('/user/login')
   }
})

export default productController;
