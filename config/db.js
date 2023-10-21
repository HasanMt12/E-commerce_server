import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'insented', // Specify the database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB Database ${conn.connection.host}`.bgGreen.white.bold);
  } catch (error) {
    console.error(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB