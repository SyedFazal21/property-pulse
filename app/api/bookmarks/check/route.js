import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

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

    const isBookMarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookMarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
