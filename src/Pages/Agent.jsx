import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import {
  addAgent,
  editAgent,
  deleteAgent,
  fetchAgentList,
  setSearch,
  setInputValue,
} from "../Redux/userSlice";
import Swal from "sweetalert2";
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

export default function AgentTable() {
  const dispatch = useDispatch();
  const { agentList, search } = useSelector((state) => state.user);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    dispatch(fetchAgentList({ page: currentPage, limit, search }))
      .unwrap()
      .then((res) => {
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
      });
  }, [dispatch, currentPage, search]);
  const handleEditClick = (agent) => {
    setSelectedAgent(agent);
    setEditName(agent?.agentName);
    setEditEmail(agent?.email);
    setEditPhone(agent?.phone);
    setEditAddress(agent?.address);
    setShowEditPopup(true);
  };

  const handleDelete = async (agentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#B3DB48",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteAgent(agentId)).unwrap();
          Swal.fire("Deleted!", "Agent has been deleted.", "success");
          dispatch(fetchAgentList({ page: currentPage, limit, search }));
        } catch (err) {
          console.error("Failed to delete agent:", err);
          Swal.fire("Error", "Failed to delete agent", "error");
        }
      }
    });
  };

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
      .then(() => {
        Swal.fire("Success", "Agent updated successfully", "success");
        setShowEditPopup(false);
        dispatch(fetchAgentList({ page: currentPage, limit, search }));
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
      return Swal.fire("Error", "All fields are required", "error");
    }

    if (!validator.isEmail(email)) {
      return Swal.fire("Error", "Invalid email format", "error");
    }

    if (!validator.isMobilePhone(phone, "en-IN")) {
      return Swal.fire("Error", "Invalid phone number", "error");
    }

    try {
      await dispatch(addAgent(addFormData)).unwrap();
      Swal.fire("Success", "Agent added successfully", "success");
      setAddFormData({ agentName: "", phone: "", email: "", address: "" });
      setShowAddPopup(false);

      // Always reload first page (fixes "no agents found")
      dispatch(fetchAgentList({ page: 1, limit: 4 }));
    } catch (err) {
      console.error("Error adding agent:", err);
      const message = err?.response?.data?.message || "Failed to add agent";
      Swal.fire("Error", message, "error");
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
      e.target.value = "";
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
    <div className="min-h-screen bg-[#E9E9E9] p-4 md:p-6">
      {/* Header */}
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-[Nunito] font-bold 4xl:text-3xl 5xl:text-3xl">
          Agents
        </h1>
        <button
          onClick={() => setShowAddPopup(true)}
          className="bg-[#B3DB48] text-black px-4 py-2 4xl:text-3xl 5xl:text-3xl rounded-md text-sm md:text-md font-[Nunito] font-bold shadow"
        >
          + Add Agent
        </button>
      </div>

      {/* Table */}
      <div className="w-full mx-auto bg-[#F6F9EF] rounded-lg p-2 md:p-4 overflow-x-auto">
        <div className="hidden md:grid grid-cols-7 font-[Nunito] font-bold 4xl:text-3xl 5xl:text-3xl text-black lg:text-[9px] xl:text-sm bg-white rounded-md shadow-sm py-3 px-4">
          <div>No</div>
          <div>Full Name</div>
          <div>Email</div>
          <div>Ph number</div>
          <div>Address</div>
          <div className="text-center">Edit</div>
          <div className="text-center">Delete</div>
        </div>

        <div className="mt-2 space-y-2">
          {agentList && agentList.length > 0 ? (
            agentList.map((agent, index) => (
              <div
                key={agent?._id || index}
                className="bg-white rounded-md shadow-sm p-3 4xl:text-2xl 5xl:text-3xl flex flex-col md:grid md:grid-cols-7  lg:text-[9px] xl:text-sm text-gray-700"
              >
                <div className="font-bold md:font-normal">
                  {index + 1 + (currentPage - 1) * limit}
                </div>
                <div>{agent?.agentName}</div>
                <div
                  className="truncate max-w-[120px] cursor-pointer"
                  title={agent?.email}
                >
                  {agent?.email?.length > 5
                    ? agent.email.slice(0, 5) + "..."
                    : agent?.email}
                </div>
                <div>{agent?.phone}</div>
                <div
                  className="truncate max-w-[150px] cursor-pointer"
                  title={agent?.address} 
                >
                  {agent?.address?.length > 15
                    ? agent.address.slice(0, 15) + "..."
                    : agent?.address}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleEditClick(agent)}
                    className="text-[#B3DB48] hover:text-green-600"
                  >
                    <Pencil className="w-2 h-2 sm:w-2 sm:h-6 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:h-6 xl:w-6 4xl:h-10 4xl:w-10 5xl:w-10" />
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-2 h-2 sm:w-2 sm:h-6 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:h-6 xl:w-6 4xl:h-10 4xl:w-10 5xl:w-10" />
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
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
        <div className="flex items-center 4xl:text-3xl 5xl:text-3xl space-x-1 text-gray-700">
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
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full font-[Nunito] font-bold ${
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

        <div className="flex items-center gap-2 4xl:text-3xl 5xl:text-3xl text-sm text-gray-700">
          <span>Go to page</span>
          <input
            type="number"
            placeholder="000"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoToPage(e);
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md"
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
        <h2 className="text-center text-xl font-[Nunito] 4xl:text-3xl 5xl:text-3xl font-bold mb-4">
          Add Agent
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
