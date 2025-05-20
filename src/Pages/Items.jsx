import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemList } from "../Redux/userSlice";

export default function ItemNameList() {
  const dispatch = useDispatch();
  const { itemList } = useSelector((state) => state.user);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(231);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Vegetables", "Fruits"];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsFilterOpen(false);
    };
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchPageItems = (page) => {
    dispatch(fetchItemList({ page }))
      .then((action) => {
        if (action.payload?.data) {
          setItems(action.payload.data);
          setTotalPages(action.payload.totalPages || 231);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPageItems(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleGoToPage = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const visibleCount = 5;
    let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let end = start + visibleCount - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visibleCount + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-600">Category &gt; Item name</p>
            <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">Item name</h2>
            <div className="flex items-center gap-3 mt-4">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none w-[180px]"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>{category}</option>
                ))}
              </select>

              {/* Item Input */}
              <input
                type="text"
                placeholder="Enter Item name"
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
              />

              {/* Add Button */}
              <button className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold">
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Table-style box */}
        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          <div className="bg-white px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
            Item name
          </div>

          <div className="mt-4 space-y-3">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No items found.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <button
              onClick={handlePrev}
              className="text-lg"
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {getPaginationNumbers().map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
                  currentPage === num
                    ? "bg-[#B3DB48] text-black"
                    : "hover:underline"
                }`}
                onClick={() => handlePageClick(num)}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              className="text-lg"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Go to page</span>
            <input
              type="number"
              placeholder="000"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGoToPage(e);
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min={1}
              max={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
