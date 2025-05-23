import { useState, useEffect, useRef } from "react";
import { Eye, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  approveUsers,
  deleteUser,
  fetchPendingUsers,
} from "../Redux/userSlice";
import { Pencil, Trash } from "lucide-react";

export default function ApproveSellerTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editTradeLicenseNumber, setEditTradeLicenseNumber] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [filter, setFilter] = useState("seller");

  const { loading, error, pending } = useSelector((state) => state.user);
  const sellers = pending[filter + "s"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchPendingUsers({ role: filter }));
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

  const handleEditClick = (seller) => {
    setSelectedSeller(seller);
    setEditName(seller?.name || "");
    setEditEmail(seller?.email || "");
    setEditPhone(seller?.phone || "");
    setEditCompanyName(seller?.companyName || "");
    setEditTradeLicenseNumber(seller?.tradeLicenseNumber || "");
    setShowEditPopup(true);
  };

  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
  };

  const handleApprove = async (userId) => {
    try {
      const resultAction = await dispatch(
        approveUsers({ userId, role: "seller", status: "approved" })
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        console.log("User approved successfully:", resultAction.payload);

        const updatedBuyers = sellers.filter((buyer) => buyer._id !== userId);
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

  return (
    <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Approval &gt; Seller</p>
          <h2 className="text-2xl font-[Nunito] font-bold">Seller</h2>
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
        className="max-w-6xl mx-auto rounded-lg p-4"
        style={{ backgroundColor: "#F6F9EF" }}
      >
        <div className="p-4 rounded-lg shadow-sm grid grid-cols-9 font-[Nunito] font-bold text-black text-sm text-center px-4 bg-white">
          <div>No</div>
          <div>Seller name</div>
          <div>Ph no</div>
          <div>Email</div>
          <div>Licence number</div>
          <div>Company name</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>

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
                <div className="space-y-4 mt-3">
                  {sellers.map((seller, index) => (
                    <div
                      key={seller._id}
                      className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
                    >
                      <div>{index + 1}</div>
                      <div>{seller.name}</div>
                      <div>{seller.phone}</div>
                      <div>{seller.email}</div>
                      <div>{seller.tradeLicenseNumber}</div>
                      <div>{seller.companyName}</div>

                      {/* Edit Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleEditClick(seller)}
                          className="text-[#B3DB48] hover:text-green-600"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => onDeleteClick(seller)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                      {/* View + Approve Button */}
                      <div className="flex flex-col gap-2 items-center">
                        <Eye
                          className="text-[#B3DB48] w-5 h-5 cursor-pointer"
                          onClick={() => navigate("/approvalForm")}
                        />
                        <button
                          onClick={() => handleApprove(seller._id)}
                          className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
            disabled={page === 1}
          >
            {"<"}
          </button>

          {getPaginationNumbers().map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-6 h-6 rounded-full ${
                page === num ? "bg-[#B3DB48] text-white" : "bg-white"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
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
        {/* Rows */}
        {/* Table Rows */}
        <div className="space-y-4 mt-3">
          {sellers.map((seller, index) => (
            <div
              key={seller._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
            >
              <div>{index + 1}</div>
              <div>{seller.name}</div>
              <div>{seller.phone}</div>
              <div>{seller.email}</div>
              <div>{seller.tradeLicenseNumber}</div>
              <div>{seller.companyName}</div>

              {/* Edit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleEditClick(seller)}
                  className="text-[#B3DB48] hover:text-green-600"
                >
                  <Pencil size={18} />
                </button>
              </div>

              {/* Delete Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => onDeleteClick(seller)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={14} />
                </button>
              </div>
              {/* View + Approve Button */}
              <div className="flex flex-col gap-2 items-center">
                <Eye
                  className="text-[#B3DB48] w-5 h-5 cursor-pointer"
                  onClick={() => navigate("/approvalForm")}
                />
                <button
                  onClick={() => handleApprove(seller._id)}
                  className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
