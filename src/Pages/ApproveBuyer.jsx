import { useState, useEffect, useRef } from "react";
import { Eye, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  approveUsers,
  fetchPendingUsers,
  setInputValue,
  setSearch,
} from "../Redux/userSlice";
import Swal from "sweetalert2";

export default function ApproveBuyerTable() {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("buyer");
  const buyers = useSelector((state) => state.user.pending.buyers);
  const totalPages = useSelector((state) => state.user.buyers.totalPages);

  const search = useSelector((state) => state.user.search);

  useEffect(() => {
    dispatch(setSearch(""));
    dispatch(setInputValue(""));
    setCurrentPage(1);
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Fetch data when page or search changes
useEffect(() => {
  dispatch(fetchPendingUsers({ role: filter, page: currentPage, search }));

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
}, [dispatch, filter, search, currentPage]); 


   const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleGoToPage = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      e.target.value = "";
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
const handleApprove = async (userId) => {
  console.log("Approving user:", { userId });

  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to approve this buyer?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#B3DB48",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve!",
  });

  if (!confirmation.isConfirmed) return;

  try {
    const resultAction = await dispatch(
      approveUsers({ userId, status: "approved" }) 
    );
    await dispatch(fetchPendingUsers({ role: "buyer", page: currentPage, search }));


    console.log("Approve result:", resultAction);

    if (approveUsers.fulfilled.match(resultAction)) {
      Swal.fire("Success", "Buyer has been approved.", "success");

      const updated = buyers.filter((b) => b._id !== userId);
      dispatch({ type: "user/updatePendingBuyers", payload: updated });
     
      navigate("/approvebuyer");
    } else {
      Swal.fire("Error", resultAction.payload || "Approval failed", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", error.message || "Something went wrong", "error");
  }
};



  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative">
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
        className="w-full mx-auto rounded-lg p-2 sm:p-4 overflow-x-auto"
        style={{ backgroundColor: "#F6F9EF" }}
      >
        {/* Table Header */}
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-2 sm:grid-cols-6 font-[Nunito] font-bold text-black text-xs sm:text-sm text-left bg-[fff]">
          <div>No</div>
          <div>Buyer name</div>
          <div className="hidden sm:block">Ph no</div>
          <div className="hidden sm:block">Email id</div>
          <div className="hidden sm:flex justify-center">View</div>
          <div className="text-right">Action</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3 mt-3">
          {buyers.map((buyer, index) => (
            <div
              key={buyer._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-2 sm:grid-cols-6 items-center text-xs sm:text-sm gap-2"
            >
              <div>{index + 1 + (currentPage - 1) * 10}</div>
              <div>{buyer.name}</div>
              <div>{buyer.phone}</div>
              <div>{buyer.email}</div>

              <div className="flex justify-center">
                <Eye
                  className="text-[#B3DB48] w-5 h-5 cursor-pointer"
                  onClick={() => navigate(`/approval/${buyer._id}`)}
                />
              </div>

              <div className="text-right">
                <button
                  className="bg-[#B3DB48] text-white px-3 py-1 rounded-md text-xs sm:text-sm"
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
      <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2">
        <div></div>
        <div className="flex items-center space-x-2 text-gray-700">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-lg"
          >
            &lt;
          </button>
          {getPaginationNumbers().map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
                currentPage === num ? "bg-[#B3DB48] text-black" : "hover:underline"
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-lg"
          >
            &gt;
          </button>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Go to page</span>
          <input
            type="number"
            placeholder="000"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoToPage(e);
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm"
            min={1}
            max={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
