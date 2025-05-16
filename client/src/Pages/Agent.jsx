import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button, Modal } from 'antd';

// Sample agent data
const agents = Array(10).fill({
  no: "01",
  fullName: "Full Name",
  email: "Email",
  phone: "Ph number",
  address: "Lorem ipsum dolor sit amet consectetur. Amet nunc varius id at...",
});

export default function AgentTable() {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const handleEditClick = (agent) => {
    setSelectedAgent(agent);
    setEditName(agent.fullName);
    setEditEmail(agent.email);
    setEditPhone(agent.phone);
    setEditAddress(agent.address);
    setShowEditPopup(true);
  };

  const handleEditOk = () => {
    console.log("Edited data:", { name: editName, email: editEmail, phone: editPhone, address: editAddress });
    setShowEditPopup(false);
  };

  const handleEditCancel = () => {
    setShowEditPopup(false);
  };

  const handleAddOk = () => {
    console.log("Add Agent clicked");
    setShowAddPopup(false);
  };

  const handleAddCancel = () => {
    setShowAddPopup(false);
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
          {agents.map((agent, index) => (
            <div
              key={index}
              className="grid grid-cols-6 bg-white rounded-md shadow-sm py-3 px-4 items-center text-sm text-gray-700"
            >
              <div>{agent.no}</div>
              <div>{agent.fullName}</div>
              <div>{agent.email}</div>
              <div>{agent.phone}</div>
              <div className="truncate">{agent.address}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleEditClick(agent)}
                  className="text-[#B3DB48] hover:text-green-600"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
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
        <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">Edit Agent</h2>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Agent Name</label>
            <input
              type="text"
              value="Ajay kumar"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Ph no</label>
            <input
              type="text"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Email ID</label>
            <input
              type="text"
              value="abc pvt ltd"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Address</label>
            <input
              type="text"
              value="6238945012"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
        <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-[Nunito] font-bold">
          save
        </button>
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
        <h2 className="text-center text-xl font-[Nunito] font-bold mb-4">Add Agent</h2>
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Agent Name</label>
            <input
              type="text"
              value="Ajay kumar"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Ph no</label>
            <input
              type="text"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Email ID</label>
            <input
              type="text"
              value="abc pvt ltd"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-[Nunito] font-bold mb-1">Address</label>
            <input
              type="text"
              value="6238945012"
              readOnly
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-gray-600"
            />
          </div>
        </div>
        <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-[Nunito] font-bold">
          save
        </button>
      </Modal>
    </div>
  );
}
