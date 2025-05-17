import Sidebar from "./Sidebar";
import Search from "./Search";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-4">
        <Search />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
