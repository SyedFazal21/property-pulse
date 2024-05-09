"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function BookMarkProperty({ property }) {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const checkIsBookmarked = async () => {
      try {
        const res = await fetch(
          `/api/bookmarks/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(property._id),
          }
        );

        if (res.status === 201 || res.status === 200) {
          const data = await res.json();
          setIsBookMarked(data.isBookMarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkIsBookmarked();
  }, [property._id, userId]);

  const handleBookMarkProperty = async () => {
    if(!userId) {
        toast.error("You need to login for Bookmark");
        return;
    }

    try {
      const res = await fetch(
        `/api/bookmarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property._id),
        }
      );

      if (res.status === 201 || res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookMarked(data.isBookMarked);
      } else if(res.status === 401) {
        toast.error("You need to login for Bookmark");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something want wrong");
    }
  };

  if(loading) return <p className="text-center">Loading....</p>

  return isBookMarked ? (
    <button
      onClick={handleBookMarkProperty}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookMarkProperty}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
}
