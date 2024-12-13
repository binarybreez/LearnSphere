import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localfilepath) => {
  if (!fs.existsSync(localfilepath)) {
    console.log("file does not exists");
    try {
      const response = await cloudinary.uploader.upload(
        "../../public/temp/pngegg.png",
        {
          resource_type: "auto",
        }
      );
      console.log("default file has been uploaded, ", response);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
  try {
    const normalisedpath = localfilepath.replace(/\\/g, "/");
    const response = await cloudinary.uploader.upload(normalisedpath, {
      resource_type: "auto",
    });
    console.log("file has been uploaded, ", response);
    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    console.log(error.message);
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }
  }
  return null;
};

export { uploadOnCloudinary };
