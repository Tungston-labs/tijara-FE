import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUserList } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import DeleteUserModal from "./Delete";
import { Modal, Input } from "antd";
import { deleteUser } from "../Redux/userSlice";
import SellerTableContent from "./SellerTable";
import BuyerTable from "./BuyerTable";


export default function SellerTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);
  const { userList } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  managerName: '',
  sellerName: '',
  companyName: '',
  phone: '',
  licenceNumber: '',
  email: ''
});
 const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLicense, setEditLicense] = useState('');
  const [filter,setFilter] = useState('seller')
  console.log(formData)


  useEffect(() => {
    dispatch(fetchUserList({ user: filter }));
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
  }, [filter]);

const handleFilterClick = (type) => {
  setIsFilterOpen(false);
  setFilter(type.toLowerCase()); 
};


  const handleDeleteUser = () => {
  if (selectedSeller) {
    console.log("Deleting user:", selectedSeller);
    // dispatch(deleteUser(selectedSeller.id)); // optional
  }
  console.log("here")
  setShowPopup(false);
};



const handleDeleteClick = (seller) => {
  setShowPopup(true)
  Modal.confirm({
    title: `Are you sure you want to delete ${seller.managerName}?`,
    content: "This action cannot be undone.",
    okText: "Delete",
    cancelText: "Cancel",
    okButtonProps: { className: "bg-red-500 text-white hover:bg-red-600" },
    onOk: async () => {
      try {
        await dispatch(deleteUser(seller._id)).unwrap(); // assumes seller._id exists
        message.success("Seller deleted successfully");
        
        dispatch(fetchUserList({ user: "seller" })); 
       // refresh list
      } catch (error) {
        message.error("Failed to delete seller");
        console.error("Delete error:", error);
      }
    },
  });
};



    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

 
  

  const handleEditClick = (seller) => {
  setSelectedSeller(seller);
  setFormData({
    managerName: seller.managerName || '',
    sellerName: seller.sellerName || '',
    companyName: seller.companyName || '',
    phone: seller.phone || '',
    licenceNumber: seller.tradeLicenseNumber || '',
    email: seller.email || '',
  });
  setShowEditPopup(true);
};


  const handleEditSave = () => {
  console.log("Saved data:", formData);
  setShowEditPopup(false);

};

console.log("showPopup state:", showPopup);



  return (
    <>
      <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
          <div>
            <p className="text-gray-500 text-sm">Users &gt; Seller</p>
            <h2 className="text-2xl font-[Nunito] font-bold">{filter==="seller"?"Seller":"buyer"}</h2>
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
                  onClick={() => handleFilterClick("Seller")}
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

     

     {filter === "seller" ? (<SellerTableContent sellers={userList} onEditClick={handleEditClick}  onDeleteClick={handleDeleteClick} />) : (<BuyerTable buyers={userList}  onEditClick={handleEditToggle} onDeleteClick={handleDeleteClick} />)}
      </div>

   {showPopup && (
  <>
    <p className="text-red-500 text-center">[MODAL CONFIRMATION FROM CURRENT COMPONENT]</p>

    <Modal
      open={showPopup}
      onCancel={() => setShowPopup(false)}
      onOk={handleDeleteUser}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ className: "bg-red-500 text-white hover:bg-red-600" }}
    >
      <h2 className="text-xl font-semibold text-black text-center mb-4">
        Are you sure you want to delete{" "}
        <span className="text-red-500 font-bold">{selectedSeller?.managerName}</span>?
      </h2>
      <p className="text-center text-gray-500 text-sm">
        This action cannot be undone.
      </p>
    </Modal>
  </>
)}


      <Modal
        title=""
        open={showEditPopup}
        onOk={handleEditSave}
        onCancel={() => setShowEditPopup(false)}
        okText="Save"
        cancelText="Cancel"
      >
      
    {/* <div className="min-h-screen bg-white flex items-center justify-center p-4"> */}
      {/* <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col items-center"> */}
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://ui-avatars.com/api/?name=Ajay+Kumar&background=0D8ABC&color=fff&size=128"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-3 object-cover"
          />
          <h2 className="text-lg font-semibold">{formData.managerName}</h2>
          <p className="text-gray-500 text-sm">{formData.companyName}</p>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Manager Name</label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 "
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Seller name</label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 "
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Company name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 "
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Ph no</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 "
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Licence number</label>
            <input
              type="text"
              name="licenceNumber"
              value={formData.licenceNumber}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Email.ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 "
            />
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 w-full flex justify-end">
          <button
            onClick={handleEditToggle}
            className="bg-[#B3DB48] text-[#757575] shadow-[0_0_20px_rgba(0,0,0,0.1)] px-4 py-2 rounded-full flex items-center gap-2 font-[Nunito] font-bold transition"
          >
            <Pencil size={16} />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      {/* </div> */}
    {/* </div> */}
      </Modal>
      
    </>
  );
}
