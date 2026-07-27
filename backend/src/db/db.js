import mongoose from "mongoose";
import { DB_NAME } from "../utils/constract.js";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.log('MongoDB is not Connected ',error)
    }
}

export default connectDB