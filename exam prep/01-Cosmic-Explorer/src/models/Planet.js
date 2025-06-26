import { Types } from "mongoose"
import {Schema,model} from 'mongoose'


const planetSchema= new Schema({
    name:{
    type: String,
        required: true,
           minLength: [2,'Name should be at least 2 characters'],
    },
    age:{
    type: String,
        required: true,
        min:[0,'Age should be positive number!']
          
    },
    solarSystem:{
    type: String,
        required: true,
        minLength:[2,"Solar system should be at least 2 characters"]
        
    },
   
      type: {
    type: String,
    enum: ['Inner', 'Outer', 'Dwarf'],
   
  
        
    },
    moons:{
    type: Number,
        required: true,
        min:0
    },
    size:{
    type: String,
        required: true,
        min:[0,'Size should be positive number!'],
    },
    rings:{
    type: String,
    enum: ['Yes','No'],
    
    },
    description:{
    type:String,
    required:true,
    minLength:[10,'Description should  be min 10 characters'],
    maxLength:[100,'Description should  be max 100 characters']

    },
    image:{
    type:String,
    required:true,
    validate: [/^Https?:\/\//,'Invalid image Url']
    },
    
    owner:{
        type: Types.ObjectId,
        ref: "User"
    },
    likedList:[{
        type: Types.ObjectId,
        ref: 'User',
    }]
    
})
const Planet =  model ('Planet',planetSchema)

export default Planet