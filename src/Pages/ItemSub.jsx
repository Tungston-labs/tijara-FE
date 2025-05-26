import { useState, useEffect } from "react";
import { addSubCategory, fetchItemSubList } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ItemNameList() {
  const dispatch = useDispatch();
const { list, totalPages, page } = useSelector((state) => state.user.itemsubList);
const [currentPage, setCurrentPage] = useState(1);
  const [itemName, setItemName] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [itemNameId, setItemNameId] = useState("");
  const [items, setItems] = useState([]);
  const [existingItems, setExistingItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [itemNameMap, setItemNameMap] = useState({}); // To map item name to ID

  const fetchPageItems = (page, itemNameFilter = "") => {
    dispatch(fetchItemSubList({ page, search: itemNameFilter }))
      .then((action) => {
        if (action.payload?.data) {
          setItems(action.payload.data);
          

          const itemMap = {};
          const uniqueItems = [];

          action.payload.data.forEach((item) => {
            const name = item.itemName?.name;
            const id = item.itemName?._id;
            if (name && id && !itemMap[name]) {
              itemMap[name] = id;
              uniqueItems.push(name);
            }
          });

          setItemNameMap(itemMap);
          setExistingItems(uniqueItems);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPageItems(currentPage, itemName);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPageItems(1, itemName);
  };

 const handleAddSubCategory = () => {
  if (!subcategory || !itemName || !itemNameId) {
    Swal.fire({
      icon: "warning",
      title: "Missing Input",
      text: "Please enter a subcategory and make sure an item is selected.",
    });
    return;
  }


  dispatch(addSubCategory({ name: subcategory, itemNameId })).then((action) => {
  console.log("Thunk result:", action);

  if (action.meta.requestStatus === "fulfilled") {
    Swal.fire({
      icon: "success",
      title: "Subcategory Added",
      text: `Subcategory "${subcategory}" was added successfully.`,
      timer: 2000,
      showConfirmButton: false,
    });
    setSubCategory("");
    fetchPageItems(currentPage, itemName);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: action.payload || "Failed to add subcategory. Please try again.",
    });
  }
});

};


  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchPageItems(page, itemName);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchPageItems(newPage, itemName);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchPageItems(newPage, itemName);
    }
  };

  const handleGoToPage = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
      fetchPageItems(value, itemName);
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
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-600">Category &gt; Item name</p>
            <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">
              Sub category
            </h2>
            <div className="flex items-center gap-3 mt-4 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Item name"
                  value={itemName}
                  onChange={(e) => {
                    const input = e.target.value;
                    setItemName(input);

                    const filtered = existingItems.filter((item) =>
                      item.toLowerCase().includes(input.toLowerCase())
                    );
                    setSuggestions(filtered);

                    // Don't search or set ID yet
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const matchedItem = existingItems.find(
                        (item) => item.toLowerCase() === itemName.toLowerCase()
                      );

                      if (matchedItem) {
                        setItemNameId(itemNameMap[matchedItem]);
                        handleSearch(); // Trigger only when exact match
                      }
                    }
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md shadow-md z-10 w-full max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setItemName(suggestion);
                          setItemNameId(itemNameMap[suggestion]);
                          setSuggestions([]);
                          handleSearch();
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                type="text"
                placeholder="Enter Sub category"
                value={subcategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                }}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
              />
              <button
                onClick={handleAddSubCategory}
                className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          <div className="grid grid-cols-2 bg-[#F9FAFB] px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
            <div>Sub Category</div>
            <div>Item</div>
          </div>

          <div className="mt-4 space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
              >
                <div>{item.name}</div>
                <div>{item.itemName?.name}</div>
              </div>
            ))}
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
