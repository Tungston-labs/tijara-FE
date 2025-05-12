import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUserList } from "../Redux/userSlice";
import { useDispatch,useSelector } from "react-redux";
import DeleteUserModal from "./Delete";
import EditableProfileCard from "./Edit";


const sellers = Array(8).fill({
  no: "01",
  managerName: "JOE JOY",
  companyName: "abc pvt ltd",
  sellerName: "JOE JOY",
  email: "Ajay132@gmail.com",
  phone: "6238945012",
  license: "1854879652",
  id: "123",
});

export default function SellerTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const {userList} = useSelector((state) => state.user)
console.log("ok",userList)
  useEffect(() => {

    dispatch(fetchUserList({user:"sell"}))
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
  
  const handleDeleteUser = () => {
    console.log("User deleted!");
    setShowPopup(false);
  };
  const handleEditUser=()=>{
  setShowEditPopup(false) 
console.log("user editing") }

  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  return (
    <>
    <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
      {/* Header and Filter Button */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
        <div>
          <p className="text-gray-500 text-sm">Users &gt; Seller</p>
          <h2 className="text-2xl font-[Nunito] font-bold">Seller</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#B3DB48] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Filter size={25} /> Filter
          </button>

          {/* Filter Popup Positioned Top Right */}
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
                onClick={() => handleFilterClick("Buyer")}
                className="w-full text-left px-4 py-3 text-md hover:bg-[#B3DB48] rounded-b-lg"
              >
                Buyer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Box */}
      <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
        {/* Table Headers */}
        <div className="p-3 rounded-lg shadow-sm grid grid-cols-10 font-[Nunito] font-bold text-black text-center text-sm whitespace-nowrap bg-white">
          <div>No</div>
          <div>Manager Name</div>
          <div>Company Name</div>
          <div>Seller Name</div>
          <div>Email.ID</div>
          <div></div>
          <div>Ph no</div>
          <div>Licence number</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3 mt-3">
          {sellers.map((seller, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-10 text-center items-center text-sm whitespace-nowrap"
            >
              <div className="text-gray-700 font-[Nunito] ">{seller.no}</div>
              <div
                className="text-[#B3DB48] font-[Nunito]  cursor-pointer hover:underline"
                onClick={() => navigate(`/profile`)}
              >
                {seller.managerName}
              </div>
              <div className="text-gray-700">{seller.companyName}</div>
              <div className="text-gray-700">{seller.sellerName}</div>
              <div className="text-gray-700">{seller.email}</div>
              <div></div>
              <div className="text-gray-700">{seller.phone}</div>
              <div className="text-gray-700">{seller.license}</div>

              <div className="flex justify-center">
             <button
          onClick={() => setShowEditPopup(true)}
          className="text-green-500 hover:text-green-700"
        >
          <Pencil size={14} />
        </button>
            </div>

              <div className="flex justify-center">
              <button
                 onClick={() => setShowPopup(true)}  
                 className="text-red-500 hover:text-red-700"
               >
                <Trash size={14} />
              </button>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {showPopup && (
        <DeleteUserModal
          onCancel={() => setShowPopup(false)}
          onDelete={handleDeleteUser}
        />
      )}   

{showEditPopup && (
  <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
    <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full p-4">
      <button
        onClick={() => setShowEditPopup(false)}
        className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
      >
        &times;
      </button>
      <EditableProfileCard />
    </div>
  </div>
)}
  

    </>
  );
}

