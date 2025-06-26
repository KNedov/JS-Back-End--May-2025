

import { JWT_SECRET } from "../config/index.js";
import jsonwebtoken from "../lib/jsonwebtoken.js";

export async function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        
    };
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, {
        expiresIn: "2h",
    });

    return token;
}
export const transformCarData = (car) => {
  const { name, specs, ...rest } = car.toObject ? car.toObject() : car;
  return {
    ...rest,
    model: name,    
    topSpeed: specs
  };

};
export const transformCarData1 = (car) => {
  const { model, topSpeed, ...rest } = car.toObject ? car.toObject() : car;
  return {
    ...rest,
    name: model,    
    specs: topSpeed
  };

};



