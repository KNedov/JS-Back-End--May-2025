import Planet from "../models/Planet.js";
// TODO:
export default {
    async getAll(filter = {}) {
        let query = Planet.find();
        
        
        if (filter.name) {
            query = query.find({
                name: { $regex: filter.name, $options: "i" },
            })
            
        }
        if (filter.solarSystem) {
            query = query.find({
                solarSystem: { $regex: filter.solarSystem, $options: "i" },
            })
            
        }
        return query;

        // const products= await Product.find();

        // if(filter.search){
        //     products = products.filter(product => product.name.toLowerCase().includes(filter.search.toLowerCase()))
        // }
        // return products
    },

    getLatest() {
        return Planet.find().sort({ _id: -1 }).limit(3);
    },

    getOne(planetId) {
        return Planet.findById(planetId);
    },

    create(planetData, ownerId) {
        return Planet.create({ ...planetData, owner: ownerId });
    },

    async like(planedId, userId) {
        const planet = await this.getOne(planedId);
        // Check if owner
        if (planet.owner.equals(userId)) {
            throw new Error("Owners cannot like!");
        }
        planet.likedList.push(userId);
        return planet.save();
        // return Product.findOneAndUpdate(productId, {
        //     $push: { recommends: userId },
        // });
    },
    async delete(planetId, userId) {
        const product = await this.getOne(planetId);

        if (!product.owner.equals(userId)) {
            throw new Error("Only owner can delete this planet!");
        }
        return Planet.findByIdAndDelete(planetId);
    },
    async edit(PlanetId, planetData, userId) {
        // Check if owner
        const product = await Planet.findById(PlanetId);
        if (!product.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this planet!");
        }
        return Planet.findByIdAndUpdate(PlanetId, planetData, {
            runValidators: true,
        });
    },
};
