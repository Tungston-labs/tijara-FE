// import { useState, useEffect, useRef } from "react";
// import { Filter } from "lucide-react";
// import { fetchItemSubList } from "../Redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// export default function ItemNameList() {
//   const dispatch = useDispatch();
//   const { itemsubList } = useSelector((state) => state.user);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemName , setItemName] = useState('');
//   const [subcategory , setSubCategory] = useState('');
//   const popupRef = useRef(null);
    

// const additems = () => {
//    const data = {
//     itemName : itemName,
//     subcategory: subcategory,
//    }
//   //  dispatch(fetchItemSubList(data))
//   //  .then ((res) =>{

//   //   if(res.status==201)
//   //   {
//   //     dispatch(fetchItemSubList)
//   //   }
//   //  })
//   //  .catch((err)=>{
//   //   console.log(err);
//   //  })
//   console.log("data")
//   }

//   // const fetchPageItems = (page) => {
//   //     dispatch(fetchItemList({ page }))
//   //       .then((action) => {
//   //         console.log("====>here",action.payload.data.products)
//   //         if (action.payload?.data) {
//   //           setItems(action.payload.data.products);
//   //           setTotalPages(action.payload.data.totalPages || 1);
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.error(error);
//   //       });
//   //   };
    
//     useEffect(() => {
//     fetchPageItems(currentPage);
//   }, [currentPage]);
   
//  const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

// const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const handleGoToPage = (e) => {
//     const value = parseInt(e.target.value, 10);
//     if (!isNaN(value) && value >= 1 && value <= totalPages) {
//       setCurrentPage(value);
//     }
//   };

//   const getPaginationNumbers = () => {
//     const pages = [];
//     const visibleCount = 5;
//     let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
//     let end = start + visibleCount - 1;

//     if (end > totalPages) {
//       end = totalPages;
//       start = Math.max(1, end - visibleCount + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };


//   // useEffect(() => {
//   //   const handleEsc = (e) => {
//   //     if (e.key === "Escape") setIsFilterOpen(false);
//   //   };
//   //   const handleClickOutside = (e) => {
//   //     if (popupRef.current && !popupRef.current.contains(e.target)) {
//   //       setIsFilterOpen(false);
//   //     }
//   //   };
//   //   document.addEventListener("keydown", handleEsc);
//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener("keydown", handleEsc);
//   //     document.removeEventListener("mousedown", handleClickOutside);
//   //   };
//   // }, []);

// const fetchItemSubList = (page) => {
//     dispatch(fetchItemSubList({ page }))
//       .then((action) => {
//         if (action.payload?.data) {
//           setItems(action.payload.data);
//           setTotalPages(action.payload.totalPages || 1);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//   const items = Array(10).fill({ subCategory: "item 1", item: "item 1" });

//   return (
//     <div className="min-h-screen bg-[#E9E9E9] p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <p className="text-sm text-gray-600">Category &gt; Item name</p>
//             <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">Sub category</h2>
//             <div className="flex items-center gap-3 mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter Item name"
//                 onChange={(e) => {
//                 setItemName(e.target.value);
//                 }}
//                 className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Sub category"
//                 onChange={(e) => {
//                 setSubCategory(e.target.value);
//                 }}
//                 className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
//               />
//               <button className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold" onClick={additems}>
//                 + Add
//               </button>
//             </div>
//           </div>
          
//         </div>

//         {/* Table */}
//         <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-white px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
//             <div>Sub Category</div>
//             <div>Item</div>
//           </div>

//           {/* Item Rows */}
//           <div className="mt-4 space-y-3">
//             {items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="grid grid-cols-2 bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
//               >
//                 <div>{item.subCategory}</div>
//                 <div>{item.item}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6">
//           <div className="flex items-center space-x-2 text-gray-700">
//             <button
//               onClick={handlePrev}
//               className="text-lg"
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {getPaginationNumbers().map((num) => (
//               <button
//                 key={num}
//                 className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
//                   currentPage === num
//                     ? "bg-[#B3DB48] text-black"
//                     : "hover:underline"
//                 }`}
//                 onClick={() => handlePageClick(num)}
//               >
//                 {num}
//               </button>
//             ))}

//             <button
//               onClick={handleNext}
//               className="text-lg"
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <span>Go to page</span>
//             <input
//               type="number"
//               placeholder="000"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleGoToPage(e);
//               }}
//               className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
//               min={1}
//               max={totalPages}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import { Filter } from "lucide-react";
// import { fetchItemSubList } from "../Redux/userSlice";
// import { useDispatch, useSelector } from "react-redux";

// export default function ItemNameList() {
//   const dispatch = useDispatch();
//   const { itemsubList } = useSelector((state) => state.user);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1); // ✅ FIXED: Declare currentPage state
//   const [itemName, setItemName] = useState("");
//   const [subcategory, setSubCategory] = useState("");
//   const [items, setItems] = useState([]); // ✅ FIXED: Added items state to hold fetched items
//   const popupRef = useRef(null);

//   const additems = () => {
//     const data = {
//       itemName: itemName,
//       subcategory: subcategory,
//     };
//     // You can implement add API logic here
//     console.log("data", data);
//   };

//   const fetchPageItems = (page) => {
//     dispatch(fetchItemSubList({ page }))
//       .then((action) => {
//         if (action.payload?.data) {
//           setItems(action.payload.data);
//           setTotalPages(action.payload.totalPages || 1);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     fetchPageItems(currentPage);
//   }, [currentPage]);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const handleGoToPage = (e) => {
//     const value = parseInt(e.target.value, 10);
//     if (!isNaN(value) && value >= 1 && value <= totalPages) {
//       setCurrentPage(value);
//     }
//   };

//   const getPaginationNumbers = () => {
//     const pages = [];
//     const visibleCount = 5;
//     let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
//     let end = start + visibleCount - 1;

//     if (end > totalPages) {
//       end = totalPages;
//       start = Math.max(1, end - visibleCount + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="min-h-screen bg-[#E9E9E9] p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <p className="text-sm text-gray-600">Category &gt; Item name</p>
//             <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">
//               Sub category
//             </h2>
//             <div className="flex items-center gap-3 mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter Item name"
//                 onChange={(e) => {
//                   setItemName(e.target.value);
//                 }}
//                 className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Sub category"
//                 onChange={(e) => {
//                   setSubCategory(e.target.value);
//                 }}
//                 className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
//               />
//               <button
//                 className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold"
//                 onClick={additems}
//               >
//                 + Add
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-white px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
//             <div>Sub Category</div>
//             <div>Item</div>
//           </div>

//           {/* Item Rows */}
//           <div className="mt-4 space-y-3">
//             {items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="grid grid-cols-2 bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
//               >
//                 <div>{item.subCategory}</div>
//                 <div>{item.item}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-6">
//           <div className="flex items-center space-x-2 text-gray-700">
//             <button
//               onClick={handlePrev}
//               className="text-lg"
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {getPaginationNumbers().map((num) => (
//               <button
//                 key={num}
//                 className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
//                   currentPage === num
//                     ? "bg-[#B3DB48] text-black"
//                     : "hover:underline"
//                 }`}
//                 onClick={() => handlePageClick(num)}
//               >
//                 {num}
//               </button>
//             ))}

//             <button
//               onClick={handleNext}
//               className="text-lg"
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <span>Go to page</span>
//             <input
//               type="number"
//               placeholder="000"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleGoToPage(e);
//               }}
//               className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
//               min={1}
//               max={totalPages}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { fetchItemSubList } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function ItemNameList() {
  const dispatch = useDispatch();
  const { itemsubList } = useSelector((state) => state.user);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemName, setItemName] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [items, setItems] = useState([]);
  const [existingItems, setExistingItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const popupRef = useRef(null);

  const fetchPageItems = (page) => {
    dispatch(fetchItemSubList({ page }))
      .then((action) => {
        if (action.payload?.data) {
          setItems(action.payload.data);
          setTotalPages(action.payload.totalPages || 1);

          // Extract unique item names for suggestions
          const uniqueItems = Array.from(
            new Set(action.payload.data.map((item) => item.item))
          );
          setExistingItems(uniqueItems);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPageItems(currentPage);
  }, [currentPage]);

  const additems = async () => {
    if (!itemName || !subcategory) return alert("Fill all fields");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/item-sub-category",
        { itemName, subcategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh the list after adding
      fetchPageItems(currentPage);

      // Clear inputs
      setItemName("");
      setSubCategory("");
      setSuggestions([]);
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item");
    }
  };

  const handleItemInput = (e) => {
    const value = e.target.value;
    setItemName(value);

    if (value.length > 0) {
      const matches = existingItems.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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
            <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">
              Sub category
            </h2>
            <div className="flex items-center gap-3 mt-4 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Item name"
                  value={itemName}
                  onChange={handleItemInput}
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
                          setSuggestions([]);
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
                className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold"
                onClick={additems}
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          <div className="grid grid-cols-2 bg-white px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
            <div>Sub Category</div>
            <div>Item</div>
          </div>

          <div className="mt-4 space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
              >
                <div>{item.subCategory}</div>
                <div>{item.item}</div>
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
