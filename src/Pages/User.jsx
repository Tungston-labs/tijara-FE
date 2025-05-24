import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import { fetchUserList, deleteUser,  editUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input, message } from "antd";
import SellerTableContent from "./SellerTable";
import BuyerTable from "./BuyerTable";

export default function UserTable() {
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  // Common fields + seller-only fields
  const initialFormData = {
    name: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
    // seller-only fields
    managerName: "",
    tradeLicenseNumber: "",
    tradeLicenseCopy: "",
    companyName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("seller"); // 'seller' or 'buyer'
  const [isEditing, setIsEditing] = useState(false);

  // Get sellers and buyers from redux state
  const sellers = useSelector((state) => state.user.sellers);
  const buyers = useSelector((state) => state.user.buyers);

  // Fetch data when filter changes
  useEffect(() => {
    dispatch(fetchUserList({ role: filter }));
    
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

  // Delete Handler
  const handleDeleteClick = (user) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${user.name || user.managerName}?`,
      content: "This action cannot be undone.",
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { className: "bg-red-500 text-white hover:bg-red-600" },
      onOk: async () => {
        try {
          await dispatch(deleteUser(user._id)).unwrap();
          message.success("User deleted successfully");
          dispatch(fetchUserList({ role: filter }));
        } catch (error) {
          message.error("Failed to delete user");
        }
      },
    });
  };

  // Edit Handler - load form data depending on role
  const handleEditClick = (user) => {
    setSelectedUser(user);
    // Reset form data to initial, then overwrite
    const baseData = {
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      password: "", // leave blank on edit
      profileImage: user.profileImage || "",
    };

    if (filter === "seller") {
      setFormData({
        ...baseData,
        managerName: user.managerName || "",
        tradeLicenseNumber: user.tradeLicenseNumber || "",
        tradeLicenseCopy: user.tradeLicenseCopy || "",
        companyName: user.companyName || "",
      });
    } else {
      // buyer: only common fields
      setFormData(baseData);
    }

    setIsEditing(true);
    setShowEditPopup(true);
  };

  // Toggle edit/save on modal button
  const handleEditToggle = () => {
    if (isEditing) {
      // Save action
      handleEditSave();
    } else {
      setIsEditing(true);
    }
  };

  // Save edited data to backend
  const handleEditSave = async () => {
    try {
      // Prepare data to send
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password; // if password blank, don't send
      }
     console.log("Edit payload:", formData);
      // Dispatch update action
      await dispatch(
        editUser({
          id: selectedUser._id,
          data: updateData,
          role: filter,
        })
      ).unwrap();

      message.success("User updated successfully");
      setShowEditPopup(false);
      setIsEditing(false);
      setSelectedUser(null);
      dispatch(fetchUserList({ role: filter })); // refresh list
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Change filter (seller/buyer)
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
            <h2 className="text-2xl font-[Nunito] font-bold capitalize">{filter}</h2>
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
            sellers={sellers.list || []}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          <BuyerTable
            buyers={buyers.list || []}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </div>

      {/* Edit Modal */}
 <Modal
  title=""
  open={showEditPopup}
  onCancel={() => {
    setShowEditPopup(false);
    setIsEditing(false);
    setSelectedUser(null);
  }}
  footer={null}
>
  {/* Profile Header */}
  <div className="flex flex-col items-center mb-6">
    <img
      src={formData.profileImage || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=128"}
      alt="Profile"
      className="w-24 h-24 rounded-full mb-3 object-cover"
    />
    <h2 className="text-lg font-semibold">{formData.name}</h2>
    <p className="text-gray-500 text-sm">{formData.email}</p>
  </div>

  {/* Form Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    {/* Common for both buyer & seller */}
    {[
      { label: "Full Name", name: "name" },
      { label: "Phone", name: "phone" },
      { label: "Email", name: "email", type: "email" },
      { label: "Profile Image URL", name: "profileImage" },
    ].map(({ label, name, type = "text" }) => (
      <div key={name}>
        <label className="text-sm font-semibold text-gray-700 block mb-1">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder={label}
          className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
        />
      </div>
    ))}

    {/* Seller-only fields */}
    {filter === "seller" && (
      <>
        {[
          { label: "Company Name", name: "companyName" },
          { label: "Manager Name", name: "managerName" },
          { label: "Trade License Number", name: "tradeLicenseNumber" },
          { label: "Trade License Copy URL", name: "tradeLicenseCopy" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              readOnly={!isEditing}
              placeholder={label}
              className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        ))}
      </>
    )}
  </div>

  {/* Action Buttons */}
  <div className="mt-6 w-full flex justify-end gap-4">
    {isEditing && (
      <button
        onClick={() => {
          setIsEditing(false);
          setShowEditPopup(false);
          setSelectedUser(null);
        }}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-[Nunito] font-bold"
      >
        Cancel
      </button>
    )}
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
