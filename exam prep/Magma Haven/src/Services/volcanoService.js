import Volcano from "../models/Volcano.js";
// TODO:
export default {
    async getAll(filter = {}) {
        let query = Volcano.find();

        if (filter.name) {
            query = query.find({
                name: { $regex: filter.name, $options: "i" },
            });
        }
        if (filter.typeVolcano) {
          
            
            query = query.find({
                typeVolcano: { $regex: filter.typeVolcano, $options: "i" },
            });
        }

        return query;
    },

    getLatest() {
        return Volcano.find().sort({ _id: -1 }).limit(3);
    },

    getOne(volcanoId) {
        return Volcano.findById(volcanoId);
    },

    create(volcanoData, ownerId) {
        return Volcano.create({ ...volcanoData, owner: ownerId });
    },

    async vote(volcanoId, userId) {
        const volcano = await this.getOne(volcanoId);
        // Check if owner
        if (volcano.owner.equals(userId)) {
            throw new Error("Owners cannot vote!");
        }
        volcano.voteList.push(userId);
        return volcano.save();
    },
    async delete(volcanoId, userId) {
        const volcano = await this.getOne(volcanoId);

        if (!volcano.owner.equals(userId)) {
            throw new Error("Only owner can delete this volcano!");
        }
        return Volcano.findByIdAndDelete(volcanoId);
    },
    async edit(volcanoId, volcanoData, userId) {
        // Check if owner
        const volcano = await Volcano.findById(volcanoId);
        if (!volcano.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this volcano!");
        }
        return Volcano.findByIdAndUpdate(volcanoId, volcanoData, {
            runValidators: true,
        });
    },
};
