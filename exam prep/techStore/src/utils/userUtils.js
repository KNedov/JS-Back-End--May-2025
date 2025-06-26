

import { JWT_SECRET } from "../config/index.js";
import jsonwebtoken from "../lib/jsonwebtoken.js";

export async function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, {
        expiresIn: "2h",
    });

    return token;
}
