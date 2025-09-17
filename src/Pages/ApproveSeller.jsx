import { useState, useEffect, useRef } from "react";
import { Eye, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  approveTradeLicense,
  approveUsers,
  deleteUser,
  fetchTradeLicense,
  setInputValue,
  setSearch,
} from "../Redux/userSlice";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";

export default function ApproveSellerTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);

  const [filter, setFilter] = useState("seller");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state) => state.user.sellers.totalPages);
  // const sellers = pending[filter + "s"];
  const sellers = useSelector((state) => state.user.tradeLicenseUsers.list);
  const search = useSelector((state) => state.user.search);

  useEffect(() => {
    dispatch(setSearch(""));
    dispatch(setInputValue(""));
    setCurrentPage(1);
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchTradeLicense({ page: currentPage, search }));
        return result;
      } catch (err) {
        console.error("Failed to fetch trade license users:", err);
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
  }, [dispatch, search,currentPage]);

  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
  };

  const handleApprove = async (userId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Approve this seller's trade license?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B3DB48",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    });

    if (confirmation.isConfirmed) {
      try {
        const result = await dispatch(
          approveTradeLicense({ userId, action: "approve" })
        );
        dispatch(fetchTradeLicense({ page: currentPage, search }))

        if (approveTradeLicense.fulfilled.match(result)) {
          Swal.fire({
            icon: "success",
            title: "Approved!",
            text: "Seller has been approved.",
            timer: 2000,
            showConfirmButton: false,
          });

          // Re-fetch list or filter it locally
          
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: result.payload?.message || "Approval failed.",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "Unexpected error occurred.",
        });
      }
    }
  };

  // const handleReject = async (userId) => {
  //   const confirmation = await Swal.fire({
  //     title: "Reject this seller?",
  //     text: "This will mark their license as rejected.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonText: "Cancel",
  //     confirmButtonText: "Yes, reject",
  //   });

  //   if (confirmation.isConfirmed) {
  //     const result = await dispatch(approveTradeLicense({ userId, action: "reject" }));
  //     if (approveTradeLicense.fulfilled.match(result)) {
  //       Swal.fire("Rejected", "Seller's license rejected.", "success");
  //       dispatch(fetchTradeLicense());
  //     } else {
  //       Swal.fire("Error", result.payload || "Rejection failed", "error");
  //     }
  //   }
  // };

  const onDeleteClick = async (seller) => {
    if (!window.confirm(`Delete ${seller.name}?`)) return;

    try {
      const result = await dispatch(
        deleteUser({ role: "seller", id: seller._id })
      );
      if (deleteUser.fulfilled.match(result)) {
        console.log("Deleted successfully:", result.payload);
      } else {
        console.error("Delete failed:", result.payload);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

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

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[#E9E9E9]">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <div className="mb-2 sm:mb-0">
          <p className="text-gray-500 text-sm">Approval &gt; Seller</p>
          <h2 className="text-2xl font-[Nunito] font-bold">Seller</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#B3DB48] text-black px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Filter size={20} color="white" /> Filter
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

      <div className="w-full mx-auto rounded-lg p-2 sm:p-4 bg-[#F6F9EF] overflow-x-auto">
        <div className="min-w-[768px] p-4 rounded-lg shadow-sm grid grid-cols-6 font-[Nunito] font-bold text-black text-sm text-center bg-[#F9FAFB]">
          <div>No</div>
          <div>Seller name</div>
          <div>Ph no</div>
          <div>Email</div>
          <div>Licence number</div>
          <div>Company name</div>
        </div>

        {/* Rows */}
        {/* Table Rows */}
        <div className="space-y-4 mt-3">
          {sellers.map((seller, index) => (
            <div
              key={seller._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
            >
              <div>{index + 1 + (currentPage - 1) * 10}</div>
              <div>{seller.name}</div>
              <div>{seller.phone}</div>
              <div>{seller.email}</div>
              <div>{seller.tradeLicenseNumber}</div>
              <div>{seller.companyName}</div>

              {/* View + Approve Button */}
              <div className="flex flex-col gap-2 items-center">
                <Eye
                  className="text-[#B3DB48] w-5 h-5 cursor-pointer"
                  onClick={() =>
                  navigate(`/approval/${seller._id}`)

                  }
                />
              </div>
              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={() => handleApprove(seller._id)}
                  className="bg-[#B3DB48] text-white px-14 py-1 rounded-md text-sm"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
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
  );
}
