
// import { useState } from "react";
// import { Pencil } from "lucide-react";

// const agents = Array(10).fill({
//   no: "01",
//   fullName: "Full Name",
//   email: "Email",
//   phone: "Ph number",
//   address: "Lorem ipsum dolor sit amet consectetur. Amet nunc varius id at...",
// });

// export default function AgentTable() {
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState(null);

//   return (
//     <div className="min-h-screen bg-[#E9E9E9] p-6 relative overflow-hidden">
//       {/* Header and Add Agent Button */}
//       <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-[Nunito] font-bold">Agents</h1>
//         <button
//           onClick={() => setShowAddPopup(true)}
//           className="bg-[#B3DB48] text-white px-5 py-2 rounded-md text-md font-[Nunito] font-bold shadow"
//         >
//           + Add Agent
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="max-w-6xl mx-auto bg-[#F6F9EF] rounded-lg p-4">
//         {/* Table Header */}
//         <div className="grid grid-cols-6 font-[Nunito] font-bold text-black text-sm bg-white rounded-md shadow-sm py-3 px-4">
//           <div>No</div>
//           <div>Full Name</div>
//           <div>Email</div>
//           <div>Ph number</div>
//           <div>Address</div>
//           <div className="text-center">Edit</div>
//         </div>

//         {/* Table Rows */}
//         <div className="mt-3 space-y-3">
//           {agents.map((agent, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-6 bg-white rounded-md shadow-sm py-3 px-4 items-center text-sm text-gray-700"
//             >
//               <div>{agent.no}</div>
//               <div>{agent.fullName}</div>
//               <div>{agent.email}</div>
//               <div>{agent.phone}</div>
//               <div className="truncate">{agent.address}</div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => {
//                     setSelectedAgent(agent);
//                     setShowEditPopup(true);
//                   }}
//                   className="text-[#B3DB48] hover:text-green-600"
//                 >
//                   <Pencil size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add Agent Modal */}
//       {showAddPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <h2 className="text-xl font-bold mb-4">Add Agent</h2>
//             {/* Replace with your Add Agent form */}
//             <input
//               type="text"
//               placeholder="Agent name"
//               className="w-full border px-3 py-2 rounded-md mb-4"
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowAddPopup(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button className="px-4 py-2 bg-[#B3DB48] text-white rounded-md">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Agent Modal */}
//       {showEditPopup && selectedAgent && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <h2 className="text-xl font-bold mb-4">Edit Agent</h2>
//             {/* Replace with your Edit Agent form */}
//             <input
//               type="text"
//               defaultValue={selectedAgent.fullName}
//               className="w-full border px-3 py-2 rounded-md mb-4"
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowEditPopup(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button className="px-4 py-2 bg-[#B3DB48] text-white rounded-md">
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { Pencil } from "lucide-react";
import AddAgent from "./AddAgent"; // make sure this exists
import EditAgent from "./EditAgent"; // make sure this exists

const agents = Array(10).fill({
  no: "01",
  fullName: "Full Name",
  email: "Email",
  phone: "Ph number",
  address: "Lorem ipsum dolor sit amet consectetur. Amet nunc varius id at...",
});

export default function AgentTable() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-6 relative overflow-hidden ">
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
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowEditPopup(true);
                  }}
                  className="text-[#B3DB48] hover:text-green-600"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup: Add Agent */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <button
              onClick={() => setShowAddPopup(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <AddAgent onClose={() => setShowAddPopup(false)} />
          </div>
        </div>
      )}

      {/* Popup: Edit Agent */}
      {showEditPopup && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60">
          <div className="relative  rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <button
              onClick={() => setShowEditPopup(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <EditAgent agent={selectedAgent} onClose={() => setShowEditPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
