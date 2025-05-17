// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function EmailForm() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//  const handleSubmit = (e) => {
//   e.preventDefault(); // prevent page reload
//   navigate("/otp"); // navigate to /otp
// };
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-[0_0_20px_rgba(0,0,0,0.1)]">
//         <form onSubmit={handleSubmit}>
//           <label className="block text-black text-lg font-[Nunito] font-bold mb-2">
//             Enter Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter your  Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-4 bg-[#ECECEC] text-gray-600 font-[Nunito] rounded-2xl mb-6 focus:outline-none focus:ring-2 "
//           />
//           <form onSubmit={handleSubmit}>
//   {/* your form fields here */}
//   <button
//     type="submit"
//     className="w-full bg-[#B3DB48] text-white py-4 rounded-2xl text-lg font-[Nunito] font-bold transition-colors"
//   >
//     Submit
//   </button>
// </form>

//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // You can make 'role' dynamic later (from UI or context)
  const role = "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/admin/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP sent successfully");
        navigate("/otp");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <label className="block text-black text-lg font-[Nunito] font-bold mb-2">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Enter your  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-[#ECECEC] text-gray-600 font-[Nunito] rounded-2xl mb-6 focus:outline-none focus:ring-2"
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 font-[Nunito]">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#B3DB48] text-white py-4 rounded-2xl text-lg font-[Nunito] font-bold transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
