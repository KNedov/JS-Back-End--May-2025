import Device from "../models/Device.js";

export default {
    async getAll(filter = {}) {
        let query = Device.find();

        if (filter.search) {
            query = query.find({
                name: { $regex: filter.search, $options: "i" },
            });
        }
        return query;

        // const products= await Product.find();

        // if(filter.search){
        //     products = products.filter(product => product.name.toLowerCase().includes(filter.search.toLowerCase()))
        // }
        // return products
    },

    getLatest() {
        return Device.find().sort({ _id: -1 }).limit(3);
    },
    getOne(productId) {
        return Device.findById(productId);
    },

    create(productData, ownerId) {
        return Device.create({ ...productData, owner: ownerId });
    },

    async prefer(productId, userId) {
        const product = await this.getOne(productId);
        // Check if owner
        if (product.owner.equals(userId)) {
            throw new Error("Owners cannot prefer!");
        }
        product.preferredList.push(userId);
        return product.save();
        // return Product.findOneAndUpdate(productId, {
        //     $push: { recommends: userId },
        // });
    },
    async delete(productId, userId) {
        const product = await this.getOne(productId);

        if (!product.owner.equals(userId)) {
            throw new Error("Only owner can delete this product!");
        }
        return Device.findByIdAndDelete(productId);
    },
    async edit(productId, productData, userId) {
        // Check if owner
        const product = await Device.findById(productId);
        if (!product.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this product!");
        }
        return Device.findByIdAndUpdate(productId, productData, {
            runValidators: true,
        });
    },
    async getCreatedProducts(userId) {
        try {
            const created = await Device.find({ owner: userId });
            return created;
        } catch (err) {
            console.error("Error while fetching created products:", err);
            throw err;
        }
    },
    async getPreferredProducts(userId) {
        try {
            const preferred = await Device.find({ preferredList: userId });
            return preferred;
        } catch (err) {
            console.error("Error while fetching preferred products:", err);
            throw err;
        }
    },
};
