import { Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-[#E9E9E9] px-10 py-2 shadow-md  -mt-4.5">
      {/* Empty div for alignment */}
      <div className="w-30"></div>  

      {/* Centered Search Bar */}
      <div className="relative flex-1 max-w-xl flex justify-center">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search here"
          className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
        />
      </div>
     
      {/* Right Section - Profile only */}
      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="flex items-center bg-white p-2 rounded-full shadow-md">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg" // Replace with actual user image
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">Ajay Kumar</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
