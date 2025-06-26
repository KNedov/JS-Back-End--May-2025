import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: true,
           minLength: [2,'Name should be at least 2 characters'],
    },
    location: {
        type: String,
        required: true,
        minLength:[3,'The Location should be at least 3 characters']
    },
    elevation: {
        type: String,
        required: true,
        min:[0,"The Elevation should be minimum 0"]
    },

    lastEruption: {
        type: String,
        required: true,
        min:[0,'The year should be minimum 0'],
        max:[2024,'The year should be minimum 2024'],
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, "Invalid image Url"],
    },
    typeVolcano: {
        type: String,
        enum: [
            "Supervolcanoes",
            "Submarine",
            "Subglacial",
            "Mud",
            "Stratovolcanoes",
            "Shield",
        ],
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description should  be min 10 characters"],
        maxLength: [100, "Description should  be max 100 characters"],
    },

    voteList: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],

    owner: {
        type: Types.ObjectId,
        ref: "User",
    },
});
const Volcano = model("Volcano", volcanoSchema);

export default Volcano;
