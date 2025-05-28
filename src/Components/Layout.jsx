import Sidebar from "./Sidebar";
import Search from "./Search";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-4">
       {  location.pathname!=="/box"&&
<Search />
       }
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
