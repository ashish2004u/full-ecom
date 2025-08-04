import express from "express";
import cors from 'cors';
import 'dotenv/config'
import ConnectDB from "./config/mongodb.js";
import './config/cloudinary.js'; // ✅ Just import — it auto-configures
import authRoutes from "./routes/authRoutes.js";




//App config
const app = express();
const port = process.env.PORT || 4000;
ConnectDB()



//middleware
app.use(express.json())
app.use(cors())


// Routes
app.use("/api", authRoutes);


//api endpoint

app.get('/',(req,res)=> {
    res.send("API is working")
})



app.listen(port, () => console.log('✅ Server started on PORT: ' + port));

