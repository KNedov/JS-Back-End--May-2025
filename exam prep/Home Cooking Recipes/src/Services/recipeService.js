import Recipe from "../models/Recipe.js";

export default {

 
   async getAll(filter = {}) {
    const query = {};

    const search = filter.search?.trim();

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    return await Recipe.find(query);
}
,

    getLatest() {
        return Recipe.find().sort({ _id: -1 }).limit(3);
    },

    getOne(recipeId) {
        return Recipe.findById(recipeId);
    },

    create(recipeData, ownerId) {
        return Recipe.create({ ...recipeData, owner: ownerId });
    },

    async recommend(recipeId, userId) {
        const recipe = await this.getOne(recipeId);
        // Check if owner
        if (recipe.owner.equals(userId)) {
            throw new Error("Owners cannot recommend!");
        }
        recipe.recommendList.push(userId);
        return recipe.save();
    
    },
    async delete(recipeId, userId) {
        const recipe = await this.getOne(recipeId);

        if (!recipe.owner.equals(userId)) {
            throw new Error("Only owner can delete this recipe!");
        }
        return Recipe.findByIdAndDelete(recipeId);
    },
    async edit(recipeId, recipeData, userId) {
        // Check if owner
        const recipe = await Recipe.findById(recipeId);
        if (!recipe.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this product!");
        }
        return Recipe.findByIdAndUpdate(recipeId, recipeData, {
            runValidators: true,
        });
    },
};
