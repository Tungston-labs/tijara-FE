// App.js
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
import PersistLogin from "./Components/PersistLogin";
import User from "./Pages/User";
import ProfileBuyer from "./Pages/ProfileBuyer";
import Email from "./Pages/Email";
import Otp from "./Pages/Otp";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="email" element={<Email />} />
      <Route path="otp" element={<Otp />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route path="/" element={<Layout />}>
        {/* PersistLogin wraps all protected routes */}
        <Route
          element={
            <PersistLogin>
              <ProtectedRoute />
            </PersistLogin>
          }
        >
          <Route path="box" element={<Boxes />} />
          <Route path="user" element={<User />} />
          <Route path="agent" element={<Agent />} />
          <Route path="approveseller" element={<ApproveSeller />} />
          <Route path="approvebuyer" element={<ApproveBuyer />} />
          <Route path="item" element={<Items />} />
          <Route path="itemsub" element={<ItemSub />} />
          <Route path="sellproducts" element={<SellerProduct />} />
          <Route path="/approval/:id" element={<ApprovalForm />} />
          <Route path="/profile/:role/:id" element={<Profile />} />
          <Route path="/profilebuyer/:userId" element={<ProfileBuyer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
