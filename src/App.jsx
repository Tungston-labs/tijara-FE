import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Boxes from "./Pages/Boxes";
import Seller from "./Pages/Seller";
import Buyer from "./Pages/Buyer";
import Profile from "./Pages/Profile";
import Confirm from "./Pages/Confirm";
import Edit from "./Pages/Edit";
import Transaction from "./Pages/Transaction";

import Otp from "./Pages/Otp";
import ResetPassword from "./Pages/ResetPassword";
import Login from "./Pages/Login";
import Delete from "./Pages/Delete";
import Agent from "./Pages/Agent";
import EditAgent from "./Pages/EditAgent";
import ApproveSeller from "./Pages/ApproveSeller";
import ApproveBuyer from "./Pages/ApproveBuyer";
import Items from "./Pages/Items";
import ItemSub from "./Pages/ItemSub";
import SellerProduct from "./Pages/SellProduct";
import ApprovalForm from "./Pages/ApprovalForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import PersistLogin from "./Components/PersistLogin"; // ✅ IMPORTANT: Add this line
import Email from "./Pages/Email";
import { Modal } from "antd";
import DemoModal from "./Pages/DemoModal";

function App() {
  return (
    <Routes>
      {/* Default Route - Login shown first */}
      <Route index element={<Login />} />

      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/edit" element={<Edit />} />
      <Route path="/email" element={<Email />} />
      
      <Route path="/demomodal" element={<DemoModal/>}/>
       
       
      {/* Protected Layout Routes */}
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}> {/* ✅ Wrap refresh logic */}
          <Route element={<ProtectedRoute />}> {/* ✅ Wrap auth logic */}
        
            <Route path="editagent" element={<EditAgent />} />
            <Route path="box" element={<Boxes />} />
            <Route path="sell" element={<Seller />} />
            <Route path="buyer" element={<Buyer />} />
            <Route path="agent" element={<Agent />} />
            <Route path="confirm" element={<Confirm />} />
            <Route path="tr" element={<Transaction />} />
            <Route path="delete" element={<Delete />} />
            <Route path="approveseller" element={<ApproveSeller />} />
            <Route path="approvebuyer" element={<ApproveBuyer />} />
            <Route path="item" element={<Items />} />
            <Route path="itemsub" element={<ItemSub />} />
            <Route path="sellproducts" element={<SellerProduct />} />
            <Route path="approvalForm" element={<ApprovalForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
