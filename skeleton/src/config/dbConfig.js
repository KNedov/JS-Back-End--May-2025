import mongoose from "mongoose";

async function initDatabase() {
    const dbUrl = `mongodb://localhost:27017`
const dbName = 'test_db'

try {
    await mongoose.connect(dbUrl,{dbName})
    console.log('DB Connected Succesfully');
    
} catch (err) {
    console.log('DB Connection Failed!')
    console.log(err.message)
    
}
}

export default initDatabase