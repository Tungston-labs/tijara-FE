import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, Filter } from "lucide-react";
import {
  fetchUserList,
  deleteUser,
  editUser,
  setSearch,
  setInputValue,
} from "../Redux/userSlice";
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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector((state) =>
    filter === "buyer"
      ? state.user.buyers.totalPages
      : state.user.sellers.totalPages
  );
  // Get sellers and buyers from redux state
  const sellers = useSelector((state) => state.user.sellers);
  const buyers = useSelector((state) => state.user.buyers);
  const search= useSelector((state)=>state.user.search)

    useEffect(() => {
    dispatch(setSearch(""));
    dispatch(setInputValue(""));
    setCurrentPage(1);
  }, [dispatch]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
useEffect(() => {
 
  dispatch(fetchUserList({ page: currentPage, role: filter, search }));


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
}, [filter, currentPage,search]);




  // Delete Handler
  const handleDeleteClick = (user) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${
        user.name || user.managerName
      }?`,
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
      const form = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      }

      // Only append password if it's filled (not empty)
      if (formData.password) {
        form.append("password", formData.password);
      }

      await dispatch(
        editUser({
          id: selectedUser._id,
          editData: form,
          role: filter,
        })
      ).unwrap();

      message.success("User updated successfully");
      setShowEditPopup(false);
      setIsEditing(false);
      setSelectedUser(null);
      dispatch(fetchUserList({ role: filter }));
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
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleGoToPage = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      e.target.value = "";
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const visibleCount = 5;
    let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
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
    <>
      <div className="p-6 min-h-screen  bg-[#E9E9E9] relative">
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
            sellers={sellers.list || []}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            currentPage={currentPage}
          />
        ) : (
          <BuyerTable
            buyers={buyers.list || []}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            currentPage={currentPage}
          />
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <button
              onClick={handlePrev}
              className="text-lg"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPaginationNumbers().map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
                  currentPage === num
                    ? "bg-[#B3DB48] text-black"
                    : "hover:underline"
                }`}
                onClick={() => handlePageClick(num)}
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="text-lg"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Go to page</span>
            <input
              type="number"
              placeholder="000"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGoToPage(e);
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
              min={1}
              max={totalPages}
            />
          </div>
        </div>
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
            src={
              formData.profileImage ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=128"
            }
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
