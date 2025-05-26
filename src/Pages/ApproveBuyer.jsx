import { useState, useEffect, useRef } from "react";
import {Eye,  Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { approveUsers, fetchPendingUsers } from "../Redux/userSlice";
import Swal from "sweetalert2";

export default function ApproveBuyerTable() {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
   const [filter, setFilter] = useState("buyer");

  const [page, setPage] = useState(1); // 🧩 Fix: Define `page`
  const pageSize = 10; // Define how many buyers per page
  const { loading, error, pending, totalPending } = useSelector((state) => state.user); // Assuming totalPending is from API
  const buyers = pending[filter + "s"] || [];

  const totalPages = Math.ceil((totalPending || buyers.length) / pageSize); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchPendingUsers({ role: filter }));
        console.log("Fetched users", response);
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


  // 🧩 Fetch buyers
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPendingUsers({ role: filter, page, limit: pageSize }));
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
  }, [filter, dispatch, page]);

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
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
const handleApprove = async (userId) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to approve this buyer?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#B3DB48",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve!",
  });

  if (confirmation.isConfirmed) {
    try {
      const resultAction = await dispatch(
        approveUsers({ userId, role: "buyer", status: "approved" })
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        const updatedBuyers = buyers.filter((buyer) => buyer._id !== userId);
        dispatch({
          type: "user/updatePendingBuyers",
          payload: updatedBuyers,
        });

        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Buyer has been approved successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/approvebuyer");
      } else {
        Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: resultAction.payload?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Unexpected error occurred.",
      });
    }
  }
};

  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
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

      {/* Table */}
  <div
  className=" w-full mx-auto rounded-lg p-4"
  style={{ backgroundColor: "#F6F9EF" }}
>
  {/* Table Header */}
  <div className="p-3 rounded-lg shadow-sm grid grid-cols-6 font-[Nunito] font-bold text-black text-sm text-left bg-[fff]">
    <div>No</div>
    <div>Buyer name</div>
    <div>Ph no</div>
    <div>Email id</div>
   
  </div>

  {/* Table Rows */}
  <div className="space-y-3 mt-3">
    {buyers.map((buyer, index) => (
      <div
        key={buyer._id}
        className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-6 items-center text-sm"
      >
        <div>{index + 1}</div>
        <div>{buyer.name}</div>
        <div>{buyer.phone}</div>
        <div>{buyer.email}</div>

        <div className="flex justify-center">
          <Eye
            className="text-[#B3DB48] w-5 h-5 cursor-pointer"
            onClick={() => navigate(`/approval/buyer/${buyer._id}`)}
          />
        </div>

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
