// import React from "react";

// export default function DeleteUserModal({ onCancel, onDelete }) {
//   return (
//     <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ">
//       <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-[0_0_20px_rgba(0,0,0,0.1)]">
//         <h2 className="text-2xl font-[Nunito] font-bold text-black mb-8">
//           Are you sure you want to <br /> delete this user?
//         </h2>

//         <div className="flex justify-center gap-6">
//           <button
//             onClick={onCancel}
//             className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium shadow-md hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onDelete}
//             className="px-6 py-2 bg-red-300 text-white rounded-xl font-medium shadow-md hover:bg-red-400 transition"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function DeleteUserModal({ onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-[Nunito] font-bold text-black mb-8">
          Are you sure you want to <br /> delete this user?
        </h2>

        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium shadow-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-6 py-2 bg-red-300 text-white rounded-xl font-medium shadow-md hover:bg-red-400 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
