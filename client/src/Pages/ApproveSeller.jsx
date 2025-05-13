// import { useState, useEffect, useRef } from "react";
// import { Eye, Filter } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Approvesellers = Array(8).fill({
//   no: "01",
//   sellerName: "JOE JOY",
//   email: "Athulk@gmail.com",
//   phone: "6238945012",
//   license: "1854879652",
//   companyName: "Abc company",
//   type: "Seller",
// });

// export default function ApproveSellerTable() {
//   const navigate = useNavigate();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const popupRef = useRef(null);

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") setIsFilterOpen(false);
//     };
//     const handleClickOutside = (e) => {
//       if (popupRef.current && !popupRef.current.contains(e.target)) {
//         setIsFilterOpen(false);
//       }
//     };
//     document.addEventListener("keydown", handleEsc);
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFilterClick = (type) => {
//     setIsFilterOpen(false);
//     navigate(`/${type.toLowerCase()}`);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
//       {/* Header */}
//       <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
//         <div>
//           <p className="text-gray-500 text-sm">Approval &gt; Seller</p>
//           <h2 className="text-2xl font-semibold">Seller</h2>
//         </div>
//         <div className="relative">
//           <button
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="bg-[#B3DB48] text-white px-4 py-2 rounded-md flex items-center gap-2"
//           >
//             <Filter size={20} /> Filter
//           </button>
//           {isFilterOpen && (
//             <div
//               ref={popupRef}
//               className="absolute right-0 mt-2 bg-[#F0EEEE] rounded-lg shadow-xl w-[180px] z-50"
//             >
//               <button
//                 onClick={() => handleFilterClick("approveseller")}
//                 className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-t-lg"
//               >
//                 Seller
//               </button>
//               <button
//                 onClick={() => handleFilterClick("approvebuyer")}
//                 className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-b-lg"
//               >
//                 Buyer
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
//         {/* Table Headers */}
//         <div className="p-3 rounded-lg shadow-sm grid grid-cols-9 font-bold text-black text-sm text-center bg-white">
//           <div>No</div>
//           <div>Seller name</div>
//           <div>Ph no</div>
//           <div>Email</div>
//           <div>Licence number</div>
//           <div>Company name</div>
//           <div>Buyer/seller</div>
//           <div>Edit</div>
//           <div>Delete</div>
//         </div>

//         {/* Rows */}
//         <div className="space-y-3 mt-3">
//           {Approvesellers.map((seller, index) => (
//             <div
//               key={index}
//               className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
//             >
//               <div>{seller.no}</div>
//               <div>{seller.sellerName}</div>
//               <div>{seller.phone}</div>
//               <div>{seller.email}</div>
//               <div>{seller.license}</div>
//               <div>{seller.companyName}</div>
//               <div>{seller.type}</div>
//               <div>
//                 <button className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm">
//                   Approve
//                 </button>
//               </div>
//               <div>
//                 <Eye className="text-[#B3DB48] w-5 h-5 mx-auto cursor-pointer" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between text-sm">
//         <div></div>
//         <div className="flex items-center gap-2">
//           <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//             {"<"}
//           </button>
//           <button className="w-6 h-6 rounded-full bg-[#B3DB48] text-white">1</button>
//           <button className="w-6 h-6 rounded-full bg-white">2</button>
//           <button className="w-6 h-6 rounded-full bg-white">3</button>
//           <button className="w-6 h-6 rounded-full bg-white">4</button>
//           <span>....</span>
//           <button className="w-6 h-6 rounded-full bg-white">231</button>
//           <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//             {">"}
//           </button>
//         </div>
//         <div className="flex items-center gap-2">
//           <span>Go to page</span>
//           <input
//             type="text"
//             placeholder="000"
//             className="w-12 px-2 py-1 rounded-md border text-center text-sm"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Eye, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ApproveSellerTable() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gotoPage, setGotoPage] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.accessToken) return;

    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/auth/unapproved-users",
          {
            params: { role: "seller", search, page, limit: 10 },
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setSellers(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(
          "Error fetching buyers data:",
          error.response?.data || error.message
        );
      }
    };

    fetchSellers();
  }, [auth.accessToken, search, page]);

  const handleApprove = (userId) => {
    axios
      .post(
        "http://localhost:5000/admin/auth/verify-user",
        {
          userId,
          role: "seller",
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setSellers((prev) => prev.filter((user) => user._id !== userId));
      })
      .catch((err) => console.error("Error approving buyer:", err));
  };

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

  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
  };

  const handleGoToPage = () => {
    const num = parseInt(gotoPage);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
    }
    setGotoPage("");
  };

  return (
    <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Approval &gt; Seller</p>
          <h2 className="text-2xl font-semibold">Seller</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#B3DB48] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Filter size={20} /> Filter
          </button>
          {isFilterOpen && (
            <div
              ref={popupRef}
              className="absolute right-0 mt-2 bg-[#F0EEEE] rounded-lg shadow-xl w-[180px] z-50"
            >
              <button
                onClick={() => handleFilterClick("approveseller")}
                className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-t-lg"
              >
                Seller
              </button>
              <button
                onClick={() => handleFilterClick("approvebuyer")}
                className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-b-lg"
              >
                Buyer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div
        className="max-w-6xl mx-auto rounded-lg p-4 "
        style={{ backgroundColor: "#F6F9EF" }}
      >
        {/* Table Headers */}
        <div className="p-4 rounded-lg shadow-sm grid grid-cols-9 font-bold text-black text-sm text-center px-4 bg-white">
          <div>No</div>
          <div>Seller name</div>
          <div>Ph no</div>
          <div>Email</div>
          <div>Licence number</div>
          <div>Company name</div>
         
          <div>Edit</div>
          <div>Delete</div>
        </div>

        {/* Rows */}
        <div className="space-y-4 mt-3">
          {sellers.map((seller, index) => (
            <div
              key={seller._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
            >
              <div>{(page - 1) * 10 + index + 1}</div>
              <div>{seller.sellerName}</div>
              <div>{seller.phone}</div>
              <div>{seller.email}</div>
              <div>{seller.tradeLicenseNumber}</div>
              <div>{seller.companyName}</div>
              <div>
                <button
                  onClick={() => handleApprove(seller._id)}
                  className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm"
                >
                  Approve
                </button>
              </div>
              <div>
                <Eye
                  className="text-[#B3DB48] w-5 h-5 mx-auto cursor-pointer"
                  onClick={() => navigate("/approvalForm")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between text-sm">
        <div></div>
        <div className="flex items-center gap-2">
          <button
            className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, page - 3),
              Math.min(totalPages, page + 2)
            )
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-6 h-6 rounded-full ${
                  page === p ? "bg-[#B3DB48] text-white" : "bg-white"
                }`}
              >
                {p}
              </button>
            ))}

          {page < totalPages && <span>....</span>}
          {page < totalPages && (
            <button
              className="w-6 h-6 rounded-full bg-white"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
          <button
            className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            {">"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Go to page</span>
          <input
            type="text"
            value={gotoPage}
            onChange={(e) => setGotoPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoToPage();
            }}
            placeholder="000"
            className="w-12 px-2 py-1 rounded-md border text-center text-sm"
          />
        </div>
      </div>
    </div>
  );
}

