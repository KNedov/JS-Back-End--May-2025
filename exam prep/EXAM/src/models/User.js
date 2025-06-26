import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    // TODO
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name should be at least 3"],
    }, lastName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "Last name should be at least 3"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [10, "Name should be at least 10"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Name should be at least 4"],
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});
const User = model("User", userSchema);

export default User;
