import Car from "../models/Car.js";
import User from "../models/User.js";
import { Types } from "mongoose";


export default {
    async getAll(filter = {}) {
        let query = Car.find();

        if (filter.search) {
            query = query.find({
                name: { $regex: filter.search, $options: "i" },
            });
        }
        

        return query;

        
    },

    getLatest() {
        return Car.find().sort({ _id: -1 }).limit(3);
    },
    getOne(carId) {
        return Car.findById(carId);
    },
      getById(carId) {
        return  Car.findById(carId);
        
        
        
    },
     getOwnerForCar(carId) {
        return  Car.findById(carId);
        
        
        
    },

    create(carData, ownerId) {
        return Car.create({ ...carData, owner: ownerId });
    },

    async Like(carId, userId) {
        const car = await this.getOne(carId);
        // Check if owner
        if (car.owner.equals(userId)) {
            throw new Error("Owners cannot Like!");
        }
        car.likes.push(userId);
        return car.save();
      
    },
    async delete(carId, userId) {
        const car = await this.getOne(carId);

        if (!car.owner.equals(userId)) {
            throw new Error("Only owner can delete this car!");
        }
        return Car.findByIdAndDelete(carId);
    },
    async edit(carId, carData, userId) {
        // Check if owner
        const car = await Car.findById(carId);
        if (!car.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this car!");
        }
        return Car.findByIdAndUpdate(carId, carData, {
            runValidators: true,
        });
    },
    async getCreatedPosts(userId) {
        try {
            const created = await Car.find({ owner: userId });
            return created;
        } catch (err) {
            console.error("Error while fetching created cars:", err);
            throw err;
        }
    },
    async  getEmailsWhoIsLiked(carId) {
  try {
   
    if (!Types.ObjectId.isValid(carId)) {
      throw new Error("Invalid carId");
    }

    
    const car = await Car.findById(carId).select("likes");
    if (!car) {
      throw new Error("Car not found");
    }

   
    if (!car.likes || car.likes.length === 0) {
      return "";
    }

    
    const users = await User.find(
      { _id: { $in: car.likes } },
      { email: 1 } 
    );

    
    const emailsString = users.map(user => user.email).join(", ");

    return emailsString;
  } catch (error) {
    console.error("Error in getEmailsWhoIsLiked:", error.message);
    throw error;
  }
}
};
