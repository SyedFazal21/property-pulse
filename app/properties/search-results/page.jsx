"use client";
import Spinner from "@/components/Spinner";
import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/PropertySearchForm";

export default function SearchResultsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
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
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Properties
            </Link>
            <h1 className="text-2xl mb-4">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <p>No Search Results Found</p>
              ) : (
                properties.map((prop) => (
                  <PropertyCard key={prop._id} property={prop}></PropertyCard>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
