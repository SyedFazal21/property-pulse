"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties?page=${page}&pagesize=${pageSize}`
        );
        if (!res.ok) {
          throw new Exception("Failed to fetch Properties");
        }

        const data = await res.json();
        setProperties(data.properties);
        setTotal(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop}></PropertyCard>
            ))
          )}
        </div>
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
