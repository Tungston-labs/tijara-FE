
import { useState, useEffect, useRef } from "react";
import { Eye, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingUsers } from "../Redux/userSlice";

export default function ApproveSellerTable() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
 
  const [filter,setFilter]=useState("seller")

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


  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    navigate(`/${type.toLowerCase()}`);
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
        className="max-w-6xl mx-auto rounded-lg p-4 "
        style={{ backgroundColor: "#F6F9EF" }}
      >
        {/* Table Headers */}
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

        {/* Rows */}
     {/* Table Rows */}
<div className="space-y-4 mt-3">
  {sellers.map((seller, index) => (
    <div
      key={seller._id}
      className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-9 items-center text-center text-sm"
    >
      <div>{index + 1}</div> {/* No */}
      <div>{seller.name}</div> {/* Seller name */}
      <div>{seller.phone}</div> {/* Ph no */}
      <div>{seller.email}</div> {/* Email */}
      <div>{seller.tradeLicenseNumber}</div> {/* Licence number */}
      <div>{seller.companyName}</div> {/* Company name */}
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

    
    </div>
  );
}

