import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";

// GET by id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property)
      return new Response("Error Fetching Property", { status: 400 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE by id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const session = await getUserSession();

    if (!session || !session.user) {
      return new Response("Not Authorized", { status: 401 });
    }

    if (!params.id)
      return new Response("Property ID is required", { status: 400 });

    const property = await Property.findById(params.id);
    const user = session.userId;

    if (property.owner.toString() !== user) {
      return new Response("Not Authorized for current User", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted Successfully", { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const session = await getUserSession();
    const { id } = params;
    const { userId } = session;

    if (!session || !session.user) {
      return new Response("Not Authorized", { status: 401 });
    }

    const existingProperty = await Property.findById({ _id: id });

    if (!existingProperty) {
      return new Response("Invalid Property ID", { status: 400 });
    }

    if (existingProperty.owner.toString() !== session.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");

    const propertyFormData = {
      owner: userId,
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      propertyFormData
    );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
