import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    // TODO
 
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
