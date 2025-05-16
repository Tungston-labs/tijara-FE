import { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

export default function ApproveBuyerTable() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const popupRef = useRef(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const[error, setError]=useState("")
  const auth = useSelector((state) => state.auth); // ⬅️ Access auth state
  console.log("Access Token from Redux:", auth.accessToken);

  //  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth.accessToken) return;

    const fetchBuyers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/auth/unapproved-users",
          
          {
            params: { role: "buyer", search, page, limit: 10 },
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        setBuyers(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(
          "Error fetching buyers data:",
          error.response?.data || error.message
        );
      }
    };

    fetchBuyers();
  }, [auth.accessToken, search, page]);
console.log("Sending token to backend:", auth.accessToken);

  const handleApprove = (userId) => {
    axios
      .post(
        "http://localhost:5000/admin/auth/verify-user",
        {
          userId,
          role: "buyer",
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
        setBuyers((prev) => prev.filter((user) => user._id !== userId));
      })
      .catch((err) => console.error("Error approving buyer:", err));
  };

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
          onClick={() => setPage(1)} // Reset to page 1 on new search
        >
          Search
        </button>
      </div>
      {/* Table */}
      <div
        className="max-w-6xl  mx-auto rounded-lg p-4"
        style={{ backgroundColor: "#F6F9EF" }}
      >
        {/* Table Header */}
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-5 font-[Nunito] font-bold text-black text-sm text-left bg-[fff]">
          <div>No</div>
          <div>Buyer name</div>
          <div>Ph no</div>
          <div>Email id</div>
          <div></div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3 mt-3">
          {buyers.map((buyer, index) => (
            <div
              key={buyer._id}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-5 items-center text-sm"
            >
              <div>{index + 1}</div>
              <div>{buyer.buyerName}</div>
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

  {/* Pagination Buttons */}
  <div className="flex items-center gap-2">
    {/* Previous */}
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
    >
      {"<"}
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`w-6 h-6 rounded-full ${
          page === i + 1 ? "bg-[#B3DB48] text-white" : "bg-white"
        }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
    >
      {">"}
    </button>
  </div>

  {/* Go to page input */}
  <div className="flex items-center gap-2">
    <span>Go to page</span>
    <input
      type="number"
      min="1"
      max={totalPages}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = parseInt(e.target.value);
          if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setPage(value);
            e.target.value = "";
          }
        }
      }}
      placeholder="000"
      className="w-12 px-2 py-1 rounded-md border text-center text-sm"
    />
  </div>
</div>

    </div>
  );
}
