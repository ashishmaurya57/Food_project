import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://Ashish_maurya:ashish13082002@cluster0.fnhwwus.mongodb.net/Food-database').then(()=>console.log("Db Connected"));
}