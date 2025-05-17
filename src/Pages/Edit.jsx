// import { FaEdit, FaKey } from "react-icons/fa";

// export default function ProfileCard() {
//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-300">
//       <div className="bg-white p-[31px] rounded-[32px] shadow-lg w-[723px] h-[646px] text-center">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
//           <h2 className="text-xl font-semibold mt-3">Ajay Kumar</h2>
//           <p className="text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Details Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[15px] mt-6 text-left">
//           <div>
//             <label className="text-sm font-medium">Manager Name</label>
//             <input
//               type="text"
//               value="Ajay kumar"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Seller name</label>
//             <input
//               type="text"
//               value="JOE JOY"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Company name</label>
//             <input
//               type="text"
//               value="abc pvt ltd"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Ph no</label>
//             <input
//               type="text"
//               value="6238945012"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Licence number</label>
//             <input
//               type="text"
//               value="1854879652"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Email.ID</label>
//             <input
//               type="text"
//               value="Ajay132@gmail.com"
//               disabled
//               className="w-full mt-1 bg-gray-100 p-2 rounded-lg text-gray-700"
//             />
//           </div>
//         </div>

//         {/* Buttons Section */}
//         <div className="flex flex-col items-end mt-6 gap-[10px]">
//           <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition">
//             <FaEdit className="text-green-500" /> Edit
//           </button>
//           <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition">
//             <FaKey className="text-green-500" /> Change password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Pencil } from "lucide-react";

// export default function EditableProfileCard() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     managerName: "Ajay kumar",
//     sellerName: "JOE JOY",
//     companyName: "abc pvt ltd",
//     phone: "6238945012",
//     licenceNumber: "1854879652",
//     email: "Ajay132@gmail.com",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEditToggle = () => setIsEditing((prev) => !prev);

//   return (
//     <div className="max-w-2xl w-full mx-auto bg-red-500 rounded-2xl p-6 shadow-md mt-10 relative">
//       {/* Profile Image */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-24 h-24 bg-gray-300 rounded-full mb-3"></div>
//         <h2 className="text-lg font-semibold">{formData.managerName}</h2>
//         <p className="text-gray-500 text-sm">{formData.companyName}</p>
//       </div>

//       {/* Form Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Manager Name</label>
//           <input
//             type="text"
//             name="managerName"
//             value={formData.managerName}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Seller name</label>
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Company name</label>
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Ph no</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Licence number</label>
//           <input
//             type="text"
//             name="licenceNumber"
//             value={formData.licenceNumber}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-700 block mb-1">Email.ID</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//           />
//         </div>
//       </div>

//       {/* Edit Button */}
//       <button
//         onClick={handleEditToggle}
//         className="absolute bottom-4 right-4 bg-lime-100 text-lime-600 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-lime-200 transition"
//       >
//         <Pencil size={16} />
//         {isEditing ? "Save" : "Edit"}
//       </button>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Pencil } from "lucide-react";

// export default function EditableProfileCard() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     managerName: "",
//     sellerName: "JOE JOY",
//     companyName: "abc pvt ltd",
//     phone: "6238945012",
//     licenceNumber: "1854879652",
//     email: "Ajay132@gmail.com",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEditToggle = () => setIsEditing((prev) => !prev);

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col items-center">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-24 h-24 bg-gray-300 rounded-full mb-3"></div>
//           <h2 className="text-lg font-semibold">{formData.managerName}</h2>
//           <p className="text-gray-200 text-sm">{formData.companyName}</p>
//         </div>

//         {/* Form Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Manager Name</label>
//             <input
//               type="text"
//               name="managerName"
//               value={formData.managerName}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Seller name</label>
//             <input
//               type="text"
//               name="sellerName"
//               value={formData.sellerName}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Company name</label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Ph no</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Licence number</label>
//             <input
//               type="text"
//               name="licenceNumber"
//               value={formData.licenceNumber}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-semibold text-white block mb-1">Email.ID</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               readOnly={!isEditing}
//               className="w-full bg-[#F1F1F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>
//         </div>

//         {/* Edit Button - moved below */}
//         <div className="mt-6 w-full flex justify-end">
//           <button
//             onClick={handleEditToggle}
//             className="bg-lime-100 text-lime-600 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-lime-200 transition"
//           >
//             <Pencil size={16} />
//             {isEditing ? "Save" : "Edit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


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
