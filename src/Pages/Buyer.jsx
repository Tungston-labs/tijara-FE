import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUserList } from "../Redux/userSlice";
import BuyerTable from "./BuyerTable";

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
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const popupRef = useRef(null);

  const [formData, setFormData] = useState({
    managerName: '',
    sellerName: '',
    companyName: '',
    phone: '',
    licenceNumber: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLicense, setEditLicense] = useState('');

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

  const handleDeleteUser = () => {
    if (selectedSeller) {
      console.log("Deleting user:", selectedSeller);
      // dispatch(deleteUser(selectedSeller.id)); // optional
    }
    setShowPopup(false);
  };

  const handleDeleteClick = (seller) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${seller.managerName}?`,
      content: "This action cannot be undone.",
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { className: "bg-red-500 text-white hover:bg-red-600" },
      onOk: async () => {
        try {
          await dispatch(deleteUser(seller._id)).unwrap();
          message.success("Seller deleted successfully");
          dispatch(fetchUserList({ user: "seller" }));
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
    <div className="p-6 min-h-screen bg-[#6711d8] relative">
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
              className="absolute right-0 mt-2 bg-[#096b62] rounded-lg shadow-xl w-[180px] z-50"
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

      {/* Table Section */}
         
      

      {/* Delete Confirmation Modal */}
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

      {/* Edit Modal */}
      <Modal
        title=""
        open={showEditPopup}
        onOk={handleEditSave}
        onCancel={() => setShowEditPopup(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://ui-avatars.com/api/?name=Ajay+Kumar&background=0D8ABC&color=fff&size=128"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-3 object-cover"
          />
          <h2 className="text-lg font-semibold">{formData.managerName}</h2>
          <p className="text-gray-500 text-sm">{formData.companyName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            { label: "Manager Name", name: "managerName" },
            { label: "Seller name", name: "sellerName" },
            { label: "Company name", name: "companyName" },
            { label: "Ph no", name: "phone" },
            { label: "Licence number", name: "licenceNumber" },
            { label: "Email.ID", name: "email" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="text-sm font-semibold text-gray-700 block mb-1">{label}</label>
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                readOnly={!isEditing}
                className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 w-full flex justify-end">
          <button
            onClick={handleEditToggle}
            className="bg-[#B3DB48] text-[#757575] shadow-[0_0_20px_rgba(0,0,0,0.1)] px-4 py-2 rounded-full flex items-center gap-2 font-[Nunito] font-bold transition"
          >
            <Pencil size={16} />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
