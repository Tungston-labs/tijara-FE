import { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApproveBuyerData = Array(8).fill({
  no: "01",
  buyerName: "JOE JOY",
  phone: "6238945012",
  email: "Athul@gmail.com",
});

export default function ApproveBuyerTable() {
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
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Approval &gt; Buyer</p>
          <h2 className="text-2xl font-semibold">Buyer</h2>
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
      <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
        {/* Table Header */}
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-5 font-bold text-black text-sm text-left bg-white">
          <div>No</div>
          <div>Buyer name</div>
          <div>Ph no</div>
          <div>Email id</div>
          <div></div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3 mt-3">
          {ApproveBuyerData.map((buyer, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-5 items-center text-sm"
            >
              <div>{buyer.no}</div>
              <div>{buyer.buyerName}</div>
              <div>{buyer.phone}</div>
              <div>{buyer.email}</div>
              <div className="text-right">
                <button className="bg-[#B3DB48] text-white px-4 py-1 rounded-md text-sm">
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
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            {"<"}
          </button>
          <button className="w-6 h-6 rounded-full bg-[#B3DB48] text-white">1</button>
          <button className="w-6 h-6 rounded-full bg-white">2</button>
          <button className="w-6 h-6 rounded-full bg-white">3</button>
          <button className="w-6 h-6 rounded-full bg-white">4</button>
          <span>....</span>
          <button className="w-6 h-6 rounded-full bg-white">231</button>
          <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            {">"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Go to page</span>
          <input
            type="text"
            placeholder="000"
            className="w-12 px-2 py-1 rounded-md border text-center text-sm"
          />
        </div>
      </div>
    </div>
  );
}
