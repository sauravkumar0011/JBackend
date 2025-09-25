import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express'
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from "./routes/application.route.js";

const app = express();
const PORT = process.env.PORT || 8009;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

//api's
app.use("/api/user/",userRoute);
app.use("/api/company/",companyRoute);
app.use("/api/job/",jobRoute);
app.use("/api/application", applicationRoute);
app.get('/',(req,res)=>{
    res.send("server is running successfully")
})
//server
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at Port ${PORT} `)});