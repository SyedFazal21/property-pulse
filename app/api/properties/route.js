import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pagesize') || 6;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties
    }

    return new Response(JSON.stringify(result ), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const session = await getUserSession();

    if (!session || !session.user) {
      return new Response("Not Authorized", { status: 401 });
    }

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images");

    const propertyFormData = {
      owner: session.userId,
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
      images: formData.get('images')
    };

    // Upload images to cloudinary
    const imageUploadPromises = [];

    for(const image of images) {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString('base64');

        // make request to cloudinary
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: 'propertypulse'
        })

        imageUploadPromises.push(result.secure_url);
    }

    const uploadImages = await Promise.all(imageUploadPromises);

    const propertyData = new Property(propertyFormData);
    propertyData.images = uploadImages;
    propertyData.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${propertyData._id}`
    );

    //return new Response(JSON.stringify(propertyFormData), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
