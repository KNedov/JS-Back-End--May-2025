import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: true,
        minLength: [2, "Brand should be at least 2 characters"],
    },
    model: {
        type: String,
        required: true,
        minLength: [5, "Model should be at least 5 characters"],
    },
    hardDisk: {
        type: String,
        required: true,
        minLength: [5, "Description should be at least 5 characters"],
    },
    screenSize: {
        type: String,
        required: true,
        minLength: [1, "Screen Size should be at least 1 characters"],
    },
    ram: {
        type: String,
        required: true,
        minLength: [2, "Ram should be at least 2 characters"],
    },
    operatingSystem: {
        type: String,
        required: true,
        minLength: [5, "Operating System must be at least 5 characters long"],
        maxLength: [20,"Operating System must be no more than 20 characters long",
        ],
    },
    cpu: {
        type: String,
        required: true,
          minLength: [10, "Operating System must be at least 10 characters long"],
        maxLength: [50,"Operating System must be no more than 50 characters long",
        ],
        
    },
    gpu: {
        type: String,
        required: true,
          minLength: [10, "Operating System must be at least 10 characters long"],
        maxLength: [50,"Operating System must be no more than 50 characters long",
        ],
    },
    price: {
        type: Number,
        required: true,
        min:[0,'Price must be positive number']
    },
    color: {
        type: String,
        required: true,
          minLength: [2, "Operating System must be at least 2 characters long"],
        maxLength: [10,"Operating System must be no more than 10 characters long",
        ],
    },
    weight: {
        type: String,
        required: true,
          minLength: [1, "Operating System must be at least 1 characters long"],
       
    },
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, "Invalid image Url"],
    },
    preferredList: [
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
const Device = model("Device", deviceSchema);

export default Device;
