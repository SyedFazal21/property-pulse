import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
    try {
      await connectDB();
    
      const session = await getUserSession();
  
      if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      const count = await Message.countDocuments({
        recipient: session.userId,
        read: false
      })
  
      return new Response(JSON.stringify(count), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Something went wrong", { status: 500 });
    }
  };