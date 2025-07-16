import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { RiShieldUserLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import logo from '../assets/images/logotijara.png';

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center mb-10 mt-4">
          <img src={logo} alt="Logo" className="h-12 object-contain" />
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

      {/* Bottom Section */}
      <div>
        {/* Profile Info & Dropdown */}
        <div className="relative inline-block text-left mt-4">
          <div
            onClick={handleProfileClick}
            className="flex items-center bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-800">Ajay Kumar</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-[#FF5B5B] px-4 py-3 text-[18px] hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Designed By */}
        <div className="mt-6 flex items-center px-2">
          <img src="/Layer 2.png" alt="Tungston Logo" className="h-10" />
          <div className="ml-2">
            <p className="text-gray-500 text-sm leading-
            tight">
              Designed by <br />
              <span className="text-[#F48211] font-extrabold">
                Tungston Labs
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
