import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const buyers = Array(8).fill({
  no: "01",
  buyerName: "JOE JOY",
  phone: "6238945012",
  planExpiring: "21-12-2025",
  paymentType: "Monthly",
  type: "Buyer",
});

export default function SellerTable() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  
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

  return (
    <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header and Filter */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Users &gt; Buyer</p>
          <h2 className="text-2xl font-semibold">Buyer</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#B3DB48] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Filter size={25} /> Filter
          </button>
          {isFilterOpen && (
            <div
              ref={popupRef}
              className="absolute right-0 mt-2 bg-[#F0EEEE] rounded-lg shadow-xl w-[180px] z-50"
            >
              <button
                onClick={() => handleFilterClick("Sell")}
                className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-t-lg"
              >
                Seller
              </button>
              <button
                onClick={() => handleFilterClick("Buy")}
                className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-b-lg"
              >
                Buyer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
        {/* Table Header */}
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-8 font-bold text-black text-center text-sm whitespace-nowrap bg-white">
          <div>No</div>
          <div>Buyer name</div>
          <div>Ph no</div>
          <div>Plan Expiring</div>
          <div>Payment type</div>
          <div>Buyer/seller</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>

        {/* Table Body */}
        <div className="space-y-3 mt-3">
          {buyers.map((buyer, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-8 text-center items-center text-sm whitespace-nowrap"
            >
              <div className="text-gray-700 font-medium">{buyer.no}</div>
              <div className="text-gray-700 font-medium">{buyer.buyerName}</div>
              <div className="text-gray-700">{buyer.phone}</div>
              <div className="text-gray-700">{buyer.planExpiring}</div>
              <div className="text-gray-700">{buyer.paymentType}</div>
              <div className="text-gray-700">{buyer.type}</div>
              <div className="flex justify-center">
                <button className="text-[#B3DB48] hover:text-green-600">
                  <Pencil size={16} />
                </button>
              </div>
              <div className="flex justify-center">
                <button className="text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
