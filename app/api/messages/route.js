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

    const readMessages = await Message.find({
      recipient: session.userId,
      read: true,
    })
      .sort({ createdAt: -1 }) // ascending order
      .populate("sender", "username")
      .populate("property", "name");

    const unReadMessages = await Message.find({
      recipient: session.userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // ascending order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unReadMessages, ...readMessages];  

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, recipient, property } =
      await request.json();

    const session = await getUserSession();

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Cannot send message to yourself.
    if (session.userId === recipient) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: session.userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response("Message Sent successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
