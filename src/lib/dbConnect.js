import mongoose from "mongoose";
let isConnected = false;
const DBconnect = async () => {
  if (isConnected) {
    
    return;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (err) {
    console.log("Connection failed", err);
    process.exit(1);
  }
};

export default DBconnect;
