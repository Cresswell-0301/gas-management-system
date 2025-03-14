import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center mt-2">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
                Previous
            </button>

            <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </span>

            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">
                Next
            </button>
        </div>
    );
};

export default Pagination;
