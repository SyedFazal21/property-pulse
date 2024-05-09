import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const session = await getUserSession();

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const message = await Message.findById(id);

    if(!message) return new Response('Message not found', {status: 400});

    // Verify Ownership
    if(message.recipient.toString() !== session.userId) {
        return new Response("Unauthorized access to message", { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
    try {
      await connectDB();
  
      const { id } = params;
  
      const session = await getUserSession();
  
      if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      const message = await Message.findById(id);
  
      if(!message) return new Response('Message not found', {status: 400});
  
      // Verify Ownership
      if(message.recipient.toString() !== session.userId) {
          return new Response("Unauthorized access to message", { status: 401 });
      }
    
      await message.deleteOne();
  
      return new Response('Message deleted successfully', { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Something went wrong", { status: 500 });
    }
  };
  