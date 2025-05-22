import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { fetchUserList, deleteUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input, message } from "antd";
import SellerTableContent from "./SellerTable";
import BuyerTable from "./BuyerTable";

export default function SellerTable() {
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    managerName: "",
    name: "",
    companyName: "",
    phone: "",
    tradeLicenceNumber: "",
    expiryDate: "",
    paymentType: "",
    mail: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [filter, setFilter] = useState("seller");
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, loading, error } = useSelector(
    (state) => state.user[filter + "s"]
  );

  // Fetch data on filter change
  useEffect(() => {
    const response = dispatch(fetchUserList({ role: filter }));

    console.log(response);
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

  // Select from state based on filter
  const sellers = useSelector((state) => state.user.sellers);
  const buyers = useSelector((state) => state.user.buyers);

  // Delete Handler
  const handleDeleteClick = (seller) => {
    setShowPopup(true);
    Modal.confirm({
      title: `Are you sure you want to delete ${seller.managerName}?`,
      content: "This action cannot be undone.",
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { className: "bg-red-500 text-white hover:bg-red-600" },
      onOk: async () => {
        try {
          await dispatch(deleteUser(seller._id)).unwrap();
          message.success("User deleted successfully");
          dispatch(fetchUserList({ user: filter }));
        } catch (error) {
          message.error("Failed to delete user");
        }
      },
    });
  };

  // Edit popup handler
  const handleEditClick = (seller) => {
    setSelectedSeller(seller);
    setFormData({
      managerName: seller.managerName || "",
      sellerName: seller.sellerName || "",
      companyName: seller.companyName || "",
      phone: seller.phone || "",
      licenceNumber: seller.tradeLicenseNumber || "",
      email: seller.email || "",
    });
    setShowEditPopup(true);
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleEditSave = () => {
    console.log("Saved data:", formData);
    setShowEditPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterClick = (type) => {
    setIsFilterOpen(false);
    setFilter(type.toLowerCase());
  };

  return (
    <>
      <div className="p-6 min-h-screen bg-[#E9E9E9] relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-4 relative">
          <div>
            <p className="text-gray-500 text-sm">Users &gt; {filter}</p>
            <h2 className="text-2xl font-[Nunito] font-bold capitalize">
              {filter}
            </h2>
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

        {/* Table content based on filter */}
        {filter === "seller" ? (
          <SellerTableContent
            sellers={sellers}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          <BuyerTable
            buyers={buyers}
            onEditClick={handleEditToggle}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </div>

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
            { label: "Seller Name", name: "sellerName" },
            { label: "Company Name", name: "companyName" },
            { label: "Phone", name: "phone" },
            { label: "Licence Number", name: "licenceNumber" },
            { label: "Email ID", name: "email", type: "email" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                {label}
              </label>
              <input
                type={type}
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
            className="bg-[#B3DB48] text-[#757575] px-4 py-2 rounded-full flex items-center gap-2 font-[Nunito] font-bold"
          >
            <Pencil size={16} />
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </Modal>
    </>
  );
}
