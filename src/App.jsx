import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Boxes from "./Pages/Boxes";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Agent from "./Pages/Agent";
import ApproveSeller from "./Pages/ApproveSeller";
import ApproveBuyer from "./Pages/ApproveBuyer";
import Items from "./Pages/Items";
import ItemSub from "./Pages/ItemSub";
import SellerProduct from "./Pages/SellProduct";
import ApprovalForm from "./Pages/ApprovalForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import PersistLogin from "./Components/PersistLogin"; // ✅ IMPORTANT: Add this line
import User from "./Pages/User";

function App() {
  return (
    <Routes>
      {/* Default Route - Login shown first */}
      <Route index element={<Login />} />

      {/* Public Routes */}
      <Route path="login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute />}>
            <Route path="box" element={<Boxes />} />

            <Route path="user" element={<User />} />
            <Route path="agent" element={<Agent />} />
            <Route path="approveseller" element={<ApproveSeller />} />
            <Route path="approvebuyer" element={<ApproveBuyer />} />
            <Route path="item" element={<Items />} />
            <Route path="itemsub" element={<ItemSub />} />
            <Route path="sellproducts" element={<SellerProduct />} />
            <Route path="/approval/:role/:id" element={<ApprovalForm />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
