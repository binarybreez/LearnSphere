import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", () => {
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `server is running at port http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
