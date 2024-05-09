import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";


export const GET = async (request) => {
    try {
      await connectDB();
      const session = await getUserSession();
  
      if (!session || !session.userId) {
        return new Response("Unauthorized", { status: 401 });
      }
     
      const { userId } = session;
  
      const user = await User.findById(userId);
  
      if (!user) return new Response("User Not found", { status: 400 });
  
      const bookmarks = user.bookmarks;

      const properties = await Property.find({_id: {$in: bookmarks}});
    
      return new Response(JSON.stringify(properties), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response("Something went wrong", { status: 500 });
    }
  };
  

export const POST = async (request) => {
  try {
    await connectDB();
    const session = await getUserSession();

    if (!session || !session.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyId = await request.json();
    const { userId } = session;

    const user = await User.findById(userId);

    if (!user) return new Response("User Not found", { status: 400 });

    let message;
    let isBookMarked = user.bookmarks.includes(propertyId);

    if (isBookMarked) {
      user.bookmarks.pull(propertyId);
      isBookMarked = false;
      message = "Bookmark Removed Successfully";
    } else {
      user.bookmarks.push(propertyId);
      isBookMarked = true;
      message = "Bookmark Added Successfully";
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookMarked }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
