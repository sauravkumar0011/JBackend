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

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//  Allow multiple origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // e.g. https://my-frontend.vercel.app
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


//api's
app.use("/api/user/",userRoute);
app.use("/api/company/",companyRoute);
app.use("/api/job/",jobRoute);
app.use("/api/application", applicationRoute);
app.get('/',(req,res)=>{
    res.send("server is running successfully")
})
//server
const PORT = process.env.PORT || 8009;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect DB:", err);
    process.exit(1);
  }
};

startServer();
