import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/db.js";
import bookRoute from "./route/book.route.js"
import cors from "cors"
import userRoute from "./route/user.route.js"


dotenv.config();


const app = express();
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json())    // collect json data form body

// connect to MongoDB
ConnectDB();

// definig routes
app.use("/book" , bookRoute)
app.use("/user" , userRoute)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});