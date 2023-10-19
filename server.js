import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "server is running"
  });
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white.bold
  );
});