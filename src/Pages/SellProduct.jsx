
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../Redux/userSlice";

export default function SellerProducts() {
  const dispatch = useDispatch();

  const { items, loading, currentPage, totalPages } = useSelector(
    (state) => state.user.products
  );
  console.log("Itemsi,", items);

  useEffect(() => {
    dispatch(fetchProductsList({ page: currentPage }))
      .unwrap()
      .then((response) => {
        console.log("Fetched products response:", response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch, currentPage]);

  const handlePageClick = (page) => {
    dispatch(fetchProductsList({ page }));
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchProductsList({ page: currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchProductsList({ page: currentPage + 1 }));
    }
  };

  const handleGoToPage = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      dispatch(fetchProductsList({ page: value }));
    }
  };

  const getPaginationNumbers = () => {
    const visibleCount = 2;
    const pages = [];
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
    <div className="min-h-screen bg-[#E9E9E9] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold font-[Nunito] mb-4">
          Seller products
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Seller name"
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[300px]"
          />
          <button className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold">
            Search
          </button>
        </div>

        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          <div className="grid grid-cols-4 bg-[#F9FAFB] font-bold font-[Nunito] text-black px-4 py-3 rounded-md border border-gray-200 shadow-sm">
            <div>Seller name</div>
            <div>Item name</div>
            <div>Item sub category</div>
            <div>Country</div>
          </div>

          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="grid grid-cols-4 bg-white px-4 py-3 rounded-md border border-gray-200 text-black shadow-sm"
                >
                  <div>
                    {item.addedBy && typeof item.addedBy === "object"
                      ? item.addedBy.name || "Unknown"
                      : "Unknown"}
                  </div>
                  <div>{item.itemName}</div>
                  <div>{item.itemSubCategory}</div>
                  <div>{item.country}</div>
                </div>
              ))
            )}
          </div>
        </div>

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
