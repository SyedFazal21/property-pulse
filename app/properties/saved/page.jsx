"use client";
import Spinner from "@/components/Spinner";
import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "react-toastify";

export default function SavedPropertyPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/bookmarks`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          toast.error("Failed to fetch properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h3 className="text-2xl font-bold">Saved Properties: </h3>
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No Saved Properties Found</p>
          ) : (
            properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop}></PropertyCard>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
