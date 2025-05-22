

import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EditableProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    managerName: "Ajay kumar",
    sellerName: "JOE JOY",
    companyName: "abc pvt ltd",
    phone: "6238945012",
    licenceNumber: "1854879652",
    email: "Ajay132@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col items-center">
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
      </div>
    </div>
  );
}
