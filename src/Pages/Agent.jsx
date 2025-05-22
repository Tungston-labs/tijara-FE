import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAgent, editAgent, fetchAgentList } from "../Redux/userSlice";
import Swal from 'sweetalert2';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone); // Change based on your locale/format

export default function AgentTable() {
  const dispatch = useDispatch();
  const { agentList } = useSelector((state) => state.user);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [addFormData, setAddFormData] = useState({
    agentName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleEditClick = (agent) => {
    setSelectedAgent(agent);
    setEditName(agent?.agentName);
    setEditEmail(agent?.email);
    setEditPhone(agent?.phone);
    setEditAddress(agent?.address);
    setShowEditPopup(true);
  };

  useEffect(() => {
    dispatch(fetchAgentList({ page: currentPage, limit }))
      .unwrap()
      .then((res) => {
        setTotalPages(res.totalPages); // Ensure your backend returns this
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
      });
  }, [dispatch, currentPage]);

  const handleEditOk = () => {
    if (!selectedAgent) return;
     if (!editName || !editEmail || !editPhone || !editAddress) {
    return alert("All fields are required");
  }

  if (!isValidEmail(editEmail)) {
    return alert("Invalid email format");
  }

  if (!isValidPhone(editPhone)) {
    return alert("Phone number must be 10 digits");
  }

    dispatch(
      editAgent({
        id: selectedAgent._id,
        editData: {
          agentName: editName,
          email: editEmail,
          phone: editPhone,
          address: editAddress,
        },
      })
    )
      .unwrap()
      Swal.fire("Success", "Agent updated successfully", "success")
      .then(() => {
        setShowEditPopup(false);
      })
      .catch((err) => {
        console.error("Failed to edit agent:", err);
            Swal.fire("Error", "Failed to update agent", "error");

      });
  };

  const handleEditCancel = () => {
    setShowEditPopup(false);
  };

  const handleAddOk = async () => {
    const { agentName, phone, email, address } = addFormData;

    if (!agentName || !phone || !email || !address) {
      return alert("All fields are required");
    }

    if (!isValidEmail(email)) {
      return alert("Invalid email format");
    }

    if (!isValidPhone(phone)) {
      return alert("Phone number must be 10 digits");
    }
  
    try {
      const res = await dispatch(addAgent(addFormData)).unwrap();
    
       Swal.fire("Success", "Agent added successfully", "success");
      // Clear and close modal
      setAddFormData({ agentName: "", phone: "", email: "", address: "" });
      setShowAddPopup(false);

      const listRes = await dispatch(fetchAgentList(currentPage)).unwrap();
      console.log("Updated agent list:", listRes);
    } catch (err) {
      console.error("Error adding agent:", err);
      Swal.fire("Error", "Failed to add agent", "error");
    }
  };

  const handleAddCancel = () => {
    setShowAddPopup(false);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleGoToPage = (e) => {
    const page = Number(e.target.value);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      e.target.value = ""; // Clear input
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const visibleCount = 5;
    let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let end = start + visibleCount - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visibleCount + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-6 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-[Nunito] font-bold">Agents</h1>
        <button
          onClick={() => setShowAddPopup(true)}
          className="bg-[#B3DB48] text-white px-5 py-2 rounded-md text-md font-[Nunito] font-bold shadow"
        >
          + Add Agent
        </button>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-[#F6F9EF] rounded-lg p-4">
        <div className="grid grid-cols-6 font-[Nunito] font-bold text-black text-sm bg-white rounded-md shadow-sm py-3 px-4">
          <div>No</div>
          <div>Full Name</div>
          <div>Email</div>
          <div>Ph number</div>
          <div>Address</div>
          <div className="text-center">Edit</div>
        </div>

        <div className="mt-3 space-y-3">
          {agentList && agentList.length > 0 ? (
            agentList.map((agent, index) => (
              <div
                key={agent?._id || index}
                className="grid grid-cols-6 bg-white rounded-md shadow-sm py-3 px-4 items-center text-sm text-gray-700"
              >
                <div>{index + 1 + (currentPage - 1) * limit}</div>{" "}
                {/* Serial number */}
                <div>{agent?.agentName}</div>
                <div>{agent?.email}</div>
                <div>{agent?.phone}</div>
                <div className="truncate">{agent?.address}</div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleEditClick(agent)}
                    className="text-[#B3DB48] hover:text-green-600"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500">No agents found.</p>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <button
            onClick={handlePrev}
            className="text-lg"
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {getPaginationNumbers().map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full font-[Nunito] font-bold ${
                currentPage === num
                  ? "bg-[#B3DB48] text-black"
                  : "hover:underline"
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleNext}
            className="text-lg"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Go to page</span>
          <input
            type="number"
            placeholder="000"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoToPage(e);
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            min={1}
            max={totalPages}
          />
        </div>
      </div>
      {/* Edit Agent Modal */}
      <Modal
        title=""
        open={showEditPopup}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        closable
        okText="Save"
        cancelText="Cancel"
      >
        <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">
          Edit Agent
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Agent Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-white rounded-md px-3 py-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full bg-white rounded-md px-3 py-2 border"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Email ID
            </label>
            <input
              type="text"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-white rounded-md px-3 py-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Address
            </label>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              className="w-full bg-white rounded-md px-3 py-2 border"
            />
          </div>
        </div>
      </Modal>

      {/* Add Agent Modal */}
      <Modal
        title=""
        open={showAddPopup}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        closable
        okText="Save"
        cancelText="Cancel"
      >
        <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">
          Add Agent
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Agent Name
            </label>
            <input
              type="text"
              name="agentName"
              value={addFormData.agentName}
              onChange={(e) =>
                setAddFormData({ ...addFormData, agentName: e.target.value })
              }
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Ph no
            </label>
            <input
              type="text"
              name="phone"
              value={addFormData.phone}
              onChange={(e) =>
                setAddFormData({ ...addFormData, phone: e.target.value })
              }
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={addFormData.email}
              onChange={(e) =>
                setAddFormData({ ...addFormData, email: e.target.value })
              }
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={addFormData.address}
              onChange={(e) =>
                setAddFormData({ ...addFormData, address: e.target.value })
              }
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
