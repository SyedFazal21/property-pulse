import React from "react";

export default function Pagination({ page, pageSize, total, onPageChange }) {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageClick = (newPage) => {
        if(newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage)
        }
    }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button onClick={() => handlePageClick(page - 1)} className="mr-2 px-2 py-1 border border-gray-300 rounded" disabled={page === 1}>
        Previous
      </button>
      <span className="mx-2">Page {page} of {totalPages}</span>
      <button onClick={() => handlePageClick(page + 1)} className="ml-2 px-2 py-1 border border-gray-300 rounded" disabled={page === totalPages}>
        Next
      </button>
    </section>
  );
}
