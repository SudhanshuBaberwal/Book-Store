import mongoose from "mongoose";

const ConnectDB = () => {
  try {
    const URI = process.env.MONGODBURI;
    mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error in Database connection", error);
  }
};

export default ConnectDB;