import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api"; // Your axios instance

import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { RiShieldUserLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import logo from '../assets/images/logotijara.png';
import { logout } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
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
    const routes = {
      Users: "/user",
      Agents: "/agent",
      Approval: "/approveseller",
      Dashboard: "/box",
      Category: "/item",
      "Sub Category": "/itemsub",
      "Sell Products": "/sellproducts",
    };
    if (routes[name]) navigate(routes[name]);
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

const path = location.pathname;

const activeMap = {
  "/box": "Dashboard",
  "/approveseller": "Approval",
  "/user": "Users",
  "/agent": "Agents",
  "/item": "Category",
  "/itemsub": "Sub Category",
  "/sellproducts": "Sell Products",
};
const [active, setActive] = useState(activeMap[path] || "Dashboard");

  const handleLogout = async () => {
    try {
      await api.post("/admin/auth/logout", {}, { withCredentials: true });

      // Clear Redux and localStorage
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-[18.5%] h-screen bg-white flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center mb-10 4xl:mb-20 mt-4">
          <img src={logo} alt="Logo" className="h-12 4xl:h-24 5xl:h-40 object-contain" />
        </div>

        {/* Menu */}
        <nav className="space-y-3 4xl:space-y-7 5xl:space-y-10 4xl:px-6 5xl:px-10">
          {menuItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => handleClick(name)}
              className={`flex items-center  w-full px-4 py-2 2xl:py-3 2xl:px-8 4xl:py-5 4xl:px-12 5xl:py-10 5xl:px-20 rounded-md 4xl:rounded-xl text-left transition-colors duration-200 font-[Nunito] text-base xl:text-lg 2xl:text-xl 4xl:text-4xl 5xl:text-6xl ${
                active === name
                  ? "bg-[#B3DB48] text-black font-bold"
                  : "bg-[#F2F2F2] text-black hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 4xl:h-9 4xl:w-9 5xl:h-14 5xl:w-14 mr-3" />
              {name}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="4xl:px-6">
        {/* Profile Info & Dropdown */}
        <div className="relative inline-block text-left mt-4 ">
          <div
            onClick={handleProfileClick}
            className="flex items-center   shadow-md cursor-pointer"
          >
           
            <div className="ml-2">
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center w-full text-[#FF5B5B] px-4  py-3 text-base 4xl:text-3xl 5xl:text-5xl justify-center hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 5xl:h-16 5xl:w-16 mr-2" />
                Log out
              </button>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              
            </div>
          )}
        </div>

        {/* Designed By */}
        <div className="mt-6 4xl:mt-10 flex items-center px-2">
          <img src="/Layer 2.png" alt="Tungston Logo" className="h-8 4xl:h-14 5xl:h-20" />
          <div className="ml-2">
            <p className="text-gray-500 text-sm 4xl:text-2xl 5xl:text-4xl leading-
            tight">
              Designed by <br />
              <span className="text-[#F48211]  font-extrabold">
                Tungston Labs
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
