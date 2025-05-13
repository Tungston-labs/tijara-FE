// import React from "react";

// export default function AddAgentForm() {
//   return (
//      <div className="min-h-screen flex items-center justify-center ">
//       <div className="bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] w-[400px] p-6">
//         <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">Add Agent</h2>

//         <div className="flex justify-center mb-6">
//           <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
//             <svg
//               className="w-12 h-12 text-gray-500"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
//             </svg>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-[Nunito] font-bold mb-1">Agent Name</label>
//             <input
//               type="text"
//               value="Ajay kumar"
//               readOnly
//               className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-[Nunito] font-bold mb-1">Ph no</label>
//             <input
//               type="text"
//               readOnly
//               className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-[Nunito] font-bold mb-1">Email ID</label>
//             <input
//               type="text"
//               value="abc pvt ltd"
//               readOnly
//               className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-[Nunito] font-bold mb-1">Address</label>
//             <input
//               type="text"
//               value="6238945012"
//               readOnly
//               className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
//             />
//           </div>
//         </div>

//         <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-[Nunito] font-bold">
//           save
//         </button>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";

export default function AddAgentForm() {
  const [formData, setFormData] = useState({
    agentName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/agent/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Agent added successfully!");
        setFormData({
          agentName: "",
          email: "",
          phone: "",
          address: "",
        });
      } else {
        setError(data.message || "Failed to add agent");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] w-[400px] p-6">
        <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">Add Agent</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-[Nunito] font-bold mb-1">Agent Name</label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-[Nunito] font-bold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-[Nunito] font-bold mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-[Nunito] font-bold mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

          <button
            type="submit"
            className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-[Nunito] font-bold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
