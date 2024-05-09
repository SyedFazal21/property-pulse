const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const dynamic = "force-dynamic";

const fetchProperties = async ({showFeatured = false} = {}) => {

  try {
    if(!apiDomain) return [];
    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ''}`, {cache: 'no-store'});

    if (!res.ok) {
      throw new Error("Unable to fetch Properties");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchProperty = async (id) => {

    try {
      if(!apiDomain) return null;
      const res = await fetch(`${apiDomain}/properties/${id}`);
  
      if (!res.ok) {
        throw new Error("Unable to fetch Properties");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export { fetchProperties, fetchProperty };
