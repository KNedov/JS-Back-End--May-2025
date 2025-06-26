import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    // TODO


    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [10, "Email should be at least 10"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Password should be at least 4"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        minLength: [2, "Username should be at least 2"],
        maxLength: [20, "Username should be at max 20 characters"],
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});
const User = model("User", userSchema);

export default User;
