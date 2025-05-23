



import { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { approveUsers, fetchPendingUsers } from "../Redux/userSlice";

export default function ApproveBuyerTable() {
  const dispatch=useDispatch()
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
     const navigate = useNavigate();

  const [filter,setFilter]=useState("buyer")

const { loading, error, pending } = useSelector((state) => state.user);
const buyers = pending[filter + "s"];
console.log(("buyerssrssdsdddsd",buyers))
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchPendingUsers({ role: filter }));
    console.log("Fetched users",response)
      // console.log("Fetched data:", response); // <-- This will now show the actual result
    } catch (err) {
      console.error("Failed to fetch pending users:", err);
    }
  };

  fetchData();

  const handleEsc = (e) => e.key === "Escape" && setIsFilterOpen(false);
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
}, [filter, dispatch]);


  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
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

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePageClick = (p) => {
    setPage(p);
  };

  const handleGoToPage = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setPage(value);
      e.target.value = "";
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const visibleCount = 5;
    let start = Math.max(1, page - Math.floor(visibleCount / 2));
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
  
const handleApprove = async (userId) => {
  try {
    const resultAction = await dispatch(
      approveUsers({ userId, role: "buyer", status: "approved" })
    );

    if (approveUsers.fulfilled.match(resultAction)) {
      console.log("User approved successfully:", resultAction.payload);

      const updatedBuyers = buyers.filter((buyer) => buyer._id !== userId);
      dispatch({
        type: "user/updatePendingBuyers",
        payload: updatedBuyers,
      });

      navigate("/user"); 
    } else {
      console.error("Failed to approve user:", resultAction.payload);
    }
  } catch (error) {
    console.error("Error dispatching approval:", error);
  }
};

  return (
    <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Approval &gt; Buyer</p>
          <h2 className="text-2xl font-[Nunito] font-bold">Buyer</h2>
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

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="px-3 py-2 border rounded-md text-sm"
        />
        <button
          className="bg-[#B3DB48] text-white px-4 py-2 rounded-md"
          onClick={() => setPage(1)}
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-5 font-[Nunito] font-bold text-black text-sm text-left bg-[fff]">
          <div>No</div>
          <div>Buyer name</div>
          <div>Ph no</div>
          <div>Email id</div>
          <div></div>
        </div>
        <div className="space-y-3 mt-3">
          {buyers.map((buyer, index) => (
            <div
              key={buyer._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-5 items-center text-sm"
            >
              <div>{index + 1}</div>
              <div>{buyer.name}</div>
              <div>{buyer.phone}</div>
              <div>{buyer.email}</div>
              <div className="text-right">
                <button
                  className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm"
                  onClick={() => handleApprove(buyer._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between text-sm">
        <div></div>

        <div className="flex items-center space-x-2 text-gray-700">
          <button onClick={handlePrev} disabled={page === 1} className="text-lg">
            &lt;
          </button>

          {getPaginationNumbers().map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
                page === num ? "bg-[#B3DB48] text-black" : "hover:underline"
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          ))}

          <button onClick={handleNext} disabled={page === totalPages} className="text-lg">
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
  );
}
