import express from "express";
import cors from 'cors';
import 'dotenv/config'
import ConnectDB from "./config/mongodb.js";
import './config/cloudinary.js'; // ✅ Just import — it auto-configures
import authRoutes from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import subcategoryRouter from "./routes/subcategoryRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import adminAuthRouter from "./routes/adminAuthRoute.js";
import adminUserRouter from "./routes/adminUserRoute.js"

//App config
const app = express();
const port = process.env.PORT || 4000;
ConnectDB()



//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // form data ke liye

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // both panels
  credentials: true,
}));




// Routes
app.use("/api", authRoutes);
app.use("/api/products", productRouter);
app.use("/api/products/", reviewRouter)
app.use("/api/category",categoryRouter);
app.use("/api/subcategory",subcategoryRouter);
// Admin routes
app.use("/api/admin/users", adminUserRouter);      // User CRUD for admins
app.use("/api/admin/auth", adminAuthRouter);       // Admin login




//api endpoint

app.get('/',(req,res)=> {
    res.send("API is working")
})



app.listen(port, () => console.log('✅ Server started on PORT: ' + port));

