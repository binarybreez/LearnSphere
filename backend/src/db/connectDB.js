import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      `\n mongoDB connected !! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
};

export default connectDB;
