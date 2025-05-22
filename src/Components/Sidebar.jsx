// import { useState } from "react";
// import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // New icons from react-icons
// import { RiDashboardFill } from "react-icons/ri";
// import { FaUsers } from "react-icons/fa6";
// import { RiShieldUserLine } from "react-icons/ri";
// import { FiUserPlus } from "react-icons/fi";
// import { PiNetworkFill } from "react-icons/pi";
// import { IoReceiptOutline } from "react-icons/io5";

// export default function Sidebar() {
//   const [active, setActive] = useState("Category");
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Dashboard", icon: RiDashboardFill },
//     { name: "Approval", icon: FiUserPlus },
//     { name: "Users", icon: FaUsers },
//     { name: "Agents", icon: RiShieldUserLine }, 
//     { name: "Category", icon: PiNetworkFill },
//     { name: "Sell Products", icon: IoReceiptOutline },
//   ];

//   const handleClick = (name) => {
//     setActive(name);
//     if (name === "Users") {
//       navigate("/sell");
//     } else if (name === "Agents") {
//       navigate("/agent");
//     } else if (name === "Approval") {
//       navigate("/approveseller");
//     } else if (name === "Dashboard") {
//       navigate("/box");
//     } else if (name === "Category") {
//       navigate("/item");
//     } else if (name === "Sell Products") {
//       navigate("/sellproducts");
//     }
//   };

//   const handleLogout = () => {
//     // Optional: Add logic to clear auth tokens if needed
//     navigate("/login");
//   };

//   return (
//     <div className="w-64 h-screen bg-white flex flex-col justify-between p-4">
//       {/* Top Section */}
//       <div>
//         {/* Logo */}
//         <div className="flex justify-center items-center mb-10 mt-4">
//           <img
//             src="/image 6.png"
//             alt="Logo"
//             className="h-12 object-contain"
//           />
//         </div>

//         {/* Menu */}
//         <nav className="space-y-3">
//           {menuItems.map(({ name, icon: Icon }) => (
//             <button
//               key={name}
//               onClick={() => handleClick(name)}
//               className={`flex items-center w-full px-4 py-3 rounded-md text-left transition-colors duration-200 font-[Nunito] text-[20px] ${
//                 active === name
//                   ? "bg-[#B3DB48] text-black font-bold"
//                   : "bg-[#F2F2F2] text-black hover:bg-gray-100"
//               }`}
//             >
//               <Icon className="w-5 h-5 mr-3" />
//               {name}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <div className="mb-4">
//         <button
//           onClick={handleLogout}
//           className="flex items-center text-[#FF5B5B] px-4 py-3 font-[Nunito] text-[18px]"
//         >
//           <LogOut className="w-5 h-5 mr-2" />
//           Log out
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// New icons from react-icons
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { RiShieldUserLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard"); // Changed from "Category" to "Dashboard"
  const navigate = useNavigate();
console.log("pthname",window.location.pathname)
  const menuItems = [
    { name: "Dashboard", icon: RiDashboardFill },
    { name: "Approval", icon: FiUserPlus },
    { name: "Users", icon: FaUsers },
    { name: "Agents", icon: RiShieldUserLine },
    { name: "Category", icon: MdCategory },
    { name: "Sub Category", icon: PiNetworkFill },
    { name: "Sell Products", icon: IoReceiptOutline },
  ];

  const handleClick = (name) => {
    setActive(name);
    if (name === "Users") {
      navigate("/user");
    } else if (name === "Agents") {
      navigate("/agent");
    } else if (name === "Approval") {
      navigate("/approveseller");
    } else if (name === "Dashboard") {
      navigate("/box");
    } else if (name === "Category") {
      navigate("/item");
      } else if (name === "Sub Category") {
      navigate("/itemsub");
    } else if (name === "Sell Products") {
      navigate("/sellproducts");
    }
  };

  const handleLogout = () => {
    // Optional: Add logic to clear auth tokens if needed
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center mb-10 mt-4">
          <img
            src="/image 6.png"
            alt="Logo"
            className="h-12 object-contain"
          />
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => handleClick(name)}
              className={`flex items-center w-full px-4 py-3 rounded-md text-left transition-colors duration-200 font-[Nunito] text-[20px] ${
                active === name
                  ? "bg-[#B3DB48] text-black font-bold"
                  : "bg-[#F2F2F2] text-black hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {name}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-[#FF5B5B] px-4 py-3 font-[Nunito] text-[18px]"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
}
