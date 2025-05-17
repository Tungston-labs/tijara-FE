import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';

function DemoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("John Doe"); // Initial value for name
  const [email, setEmail] = useState("john.doe@example.com"); // Initial value for email

  // Function to show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handle the "OK" action (save changes)
  const handleOk = () => {
    setIsModalOpen(false);
    console.log("Saved data:", { name, email });
  };

  // Handle the "Cancel" action (close modal without saving)
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <p>haiiiiiii....</p>
      <Button type="primary" onClick={showModal}>
        Edit Details
      </Button>
      <Modal
        title="Edit User Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
      >
        {/* Editable Fields */}
        <div className="modal-content">
          <div className="modal-field">
            <label>Name:</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name on change
            />
          </div>
          <div className="modal-field">
            <label>Email:</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email on change
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DemoModal;
