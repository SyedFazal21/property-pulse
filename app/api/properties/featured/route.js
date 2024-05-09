import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({is_featured: true});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};