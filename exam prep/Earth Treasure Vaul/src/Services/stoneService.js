import Stone from "../models/Stones.js";

export default {

 
   async getAll(filter = {}) {
    const query = {};

    const search = filter.search?.trim();

    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    return await Stone.find(query);
}
,

    getLatest() {
        return Stone.find().sort({ _id: -1 }).limit(3);
    },

    getOne(stoneId) {
        return Stone.findById(stoneId);
    },

    create(stoneData, ownerId) {
        return Stone.create({ ...stoneData, owner: ownerId });
    },

    async Like(stoneId, userId) {
        const stone = await this.getOne(stoneId);
        // Check if owner
        if (stone.owner.equals(userId)) {
            throw new Error("Owners cannot Like!");
        }
        stone.likedList.push(userId);
        return stone.save();
    
    },
    async delete(stoneId, userId) {
        const stone = await this.getOne(stoneId);

        if (!stone.owner.equals(userId)) {
            throw new Error("Only owner can delete this stone!");
        }
        return Stone.findByIdAndDelete(stoneId);
    },
    async edit(stoneId, stoneData, userId) {
        // Check if owner
        const stone = await Stone.findById(stoneId);
        if (!stone.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this stone!");
        }
        return Stone.findByIdAndUpdate(stoneId, stoneData, {
            runValidators: true,
        });
    },
};
