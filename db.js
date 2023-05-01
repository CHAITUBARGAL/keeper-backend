import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://chetan11:Chetan11@cluster0.i3lteiy.mongodb.net/keeper');
        console.log(`Connected to MongoDB DataBase`);
        
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
    }
}
export default connectDB;