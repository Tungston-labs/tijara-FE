 // import React from "react";

// const ProfileCard = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-300">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] md:w-[500px]">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center text-center mb-4">
//           <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
//           <h2 className="text-lg font-semibold">Ajay kumar</h2>
//           <p className="text-sm text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Manager & Seller Details */}
//         <div className="grid grid-cols-2 gap-2 text-sm mb-4">
//           <div>
//             <p className="font-semibold">Manager Name</p>
//             <input type="text" value="Ajay kumar" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//           <div>
//             <p className="font-semibold">Seller name</p>
//             <input type="text" value="JOE JOY" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//           <div>
//             <p className="font-semibold">Company name</p>
//             <input type="text" value="abc pvt ltd" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//           <div>
//             <p className="font-semibold">Ph no</p>
//             <input type="text" value="6238945012" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//           <div>
//             <p className="font-semibold">Licence number</p>
//             <input type="text" value="1854879652" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//           <div>
//             <p className="font-semibold">Email.ID</p>
//             <input type="text" value="Ajay132@gmail.com" className="w-full p-1 border rounded bg-gray-100" readOnly />
//           </div>
//         </div>

//         {/* Monthly Payment Collection */}
//         <div className="bg-gray-100 p-3 rounded mb-2">
//           <p className="font-semibold">Monthly Payment Collection</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             <p>Payment per-month</p>
//             <p>12 June 2025</p>
//             <p>85</p>
//             <input type="text" className="border p-1 rounded text-sm w-full" placeholder="Agent name" />
//           </div>
//         </div>

//         {/* Hide Transaction Summary */}
//         <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer">
//           Hide transaction Summary
//         </p>

//         {/* Payment History */}
//         <div className="mt-2">
//           <p className="font-semibold">Payment History</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             {["Ajay", "Ajay", "Pranav", "Pranav"].map((agent, index) => (
//               <React.Fragment key={index}>
//                 <p>Payment per-month</p>
//                 <p>12 June 2025</p>
//                 <p>85</p>
//                 <p>{agent}</p>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full mt-4 bg-[#B3DB48] text-white py-2 rounded font-semibold">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

// import React from "react";

// const ProfileCard = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-300">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] md:w-[500px]">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center text-center mb-4">
//           <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
//           <h2 className="text-lg font-semibold">Ajay kumar</h2>
//           <p className="text-sm text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Manager & Seller Details */}
//         <div className="grid grid-cols-2 gap-2 text-sm mb-4">
//           <div>
//             <p className="font-semibold">Manager Name</p>
//             <input
//               type="text"
//               value="Ajay kumar"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Seller name</p>
//             <input
//               type="text"
//               value="JOE JOY"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Company name</p>
//             <input
//               type="text"
//               value="abc pvt ltd"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Ph no</p>
//             <input
//               type="text"
//               value="6238945012"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Licence number</p>
//             <input
//               type="text"
//               value="1854879652"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Email.ID</p>
//             <input
//               type="text"
//               value="Ajay132@gmail.com"
//               className="w-full p-1 rounded bg-gray-100"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Monthly Payment Collection */}
//         <div className="bg-gray-100 p-3 rounded mb-2">
//           <p className="font-semibold">Monthly Payment Collection</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             <p>Payment per-month</p>
//             <p>12 June 2025</p>
//             <p>85</p>
//             <input
//               type="text"
//               className="border p-1 rounded text-sm w-full"
//               placeholder="Agent name"
//             />
//           </div>
//         </div>

//         {/* Hide Transaction Summary */}
//         <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer">
//           Hide transaction Summary
//         </p>

//         {/* Payment History */}
//         <div className="mt-2">
//           <p className="font-semibold">Payment History</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             {["Ajay", "Ajay", "Pranav", "Pranav"].map((agent, index) => (
//               <React.Fragment key={index}>
//                 <p>Payment per-month</p>
//                 <p>12 June 2025</p>
//                 <p>85</p>
//                 <p>{agent}</p>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full mt-4 bg-[#B3DB48] text-white py-2 rounded font-semibold">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


// import React from "react";

// const ProfileCard = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-300">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] md:w-[500px]">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center text-center mb-4">
//           <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
//           <h2 className="text-lg font-semibold">Ajay kumar</h2>
//           <p className="text-sm text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Manager & Seller Details */}
//         <div className="grid grid-cols-2 gap-2 text-sm mb-4">
//           <div>
//             <p className="font-semibold">Manager Name</p>
//             <input
//               type="text"
//               value="Ajay kumar"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Seller name</p>
//             <input
//               type="text"
//               value="JOE JOY"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Company name</p>
//             <input
//               type="text"
//               value="abc pvt ltd"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Ph no</p>
//             <input
//               type="text"
//               value="6238945012"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Licence number</p>
//             <input
//               type="text"
//               value="1854879652"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//           <div>
//             <p className="font-semibold">Email.ID</p>
//             <input
//               type="text"
//               value="Ajay132@gmail.com"
//               className="w-full p-1 rounded border-none outline-none"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Monthly Payment Collection */}
//         <div className="bg-gray-100 p-3 rounded mb-2">
//           <p className="font-semibold">Monthly Payment Collection</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             <p>Payment per-month</p>
//             <p>12 June 2025</p>
//             <p>85</p>
//             <input
//               type="text"
//               className="border p-1 rounded text-sm w-full"
//               placeholder="Agent name"
//             />
//           </div>
//         </div>

//         {/* Hide Transaction Summary */}
//         <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer">
//           Hide transaction Summary
//         </p>

//         {/* Payment History */}
//         <div className="mt-2">
//           <p className="font-semibold">Payment History</p>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="font-medium">Status</p>
//             <p className="font-medium">Date</p>
//             <p className="font-medium">Amount</p>
//             <p className="font-medium">Agent Info</p>
//             {["Ajay", "Ajay", "Pranav", "Pranav"].map((agent, index) => (
//               <React.Fragment key={index}>
//                 <p>Payment per-month</p>
//                 <p>12 June 2025</p>
//                 <p>85</p>
//                 <p>{agent}</p>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full mt-4 bg-[#B3DB48] text-white py-2 rounded font-semibold">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


// import React from "react";

// const ProfileCard = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-400 p-4">
//       <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-[600px]">
//         {/* Profile Section */}
//         <div className="bg-gray-100 p-6 rounded-t-lg text-center">
//           <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
//           <h2 className="text-lg font-semibold">Ajay kumar</h2>
//           <p className="text-sm text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Manager & Seller Details */}
//         <div className="grid grid-cols-2 gap-4 bg-white p-4">
//           {[
//             { label: "Manager Name", value: "Ajay kumar" },
//             { label: "Seller name", value: "JOE JOY" },
//             { label: "Company name", value: "abc pvt ltd" },
//             { label: "Ph no", value: "6238945012" },
//             { label: "Licence number", value: "1854879652" },
//             { label: "Email.ID", value: "Ajay132@gmail.com" },
//           ].map((item, index) => (
//             <div key={index}>
//               <p className="font-semibold text-sm">{item.label}</p>
//               <input
//                 type="text"
//                 value={item.value}
//                 className="w-full p-2 bg-gray-100 rounded-md text-sm outline-none"
//                 readOnly
//               />
//             </div>
//           ))}
//         </div>

//         {/* Monthly Payment Collection */}
//         <div className="bg-gray-100 p-4">
//           <p className="font-semibold mb-2">Monthly Payment Collection</p>
//           <div className="grid grid-cols-4 gap-2 text-sm font-medium">
//             <p>Status</p>
//             <p>Date</p>
//             <p>Amount</p>
//             <p>Agent Info</p>
//           </div>
//           <div className="grid grid-cols-4 gap-2 text-sm mt-2">
//             <p className="text-gray-500">Payment per-month</p>
//             <p className="text-gray-500">12 June 2025</p>
//             <p className="text-gray-500">85</p>
//             <input
//               type="text"
//               className="border p-2 rounded text-sm w-full"
//               placeholder="Agent name"
//             />
//           </div>
//         </div>

//         {/* Hide Transaction Summary */}
//         <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer p-4">
//           Hide transaction Summary
//         </p>

//         {/* Payment History */}
//         <div className="bg-white p-4">
//           <p className="font-semibold mb-2">Payment History</p>
//           <div className="grid grid-cols-4 gap-2 text-sm font-medium">
//             <p>Status</p>
//             <p>Date</p>
//             <p>Amount</p>
//             <p>Agent Info</p>
//           </div>
//           {["Ajay", "Ajay", "Pranav", "Pranav"].map((agent, index) => (
//             <div key={index} className="grid grid-cols-4 gap-2 text-sm mt-2">
//               <p className="text-gray-500">Payment per-month</p>
//               <p className="text-gray-500">12 June 2025</p>
//               <p className="text-gray-500">85</p>
//               <p className="text-gray-500">{agent}</p>
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <div className="bg-gray-100 p-4 rounded-b-lg">
//           <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-semibold">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


// import React from "react";

// const ProfileCard = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-white-300 p-4">
//       <div className="bg-white shadow-lg rounded-2xl w-[90%] max-w-[600px] overflow-hidden">
//         {/* Profile Section */}
//         <div className="bg-gray-100 p-6 text-center">
//           <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
//           <h2 className="text-lg font-semibold">Ajay kumar</h2>
//           <p className="text-sm text-gray-500">abc pvt ltd</p>
//         </div>

//         {/* Manager & Seller Details */}
//         <div className="grid grid-cols-2 gap-4 p-6 bg-white">
//           {["Manager Name", "Seller name", "Company name", "Ph no", "Licence number", "Email.ID"].map(
//             (label, index) => (
//               <div key={index}>
//                 <p className="font-semibold text-sm">{label}</p>
//                 <input
//                   type="text"
//                   value={
//                     [
//                       "Ajay kumar",
//                       "JOE JOY",
//                       "abc pvt ltd",
//                       "6238945012",
//                       "1854879652",
//                       "Ajay132@gmail.com",
//                     ][index]
//                   }
//                   className="w-full p-2 bg-gray-100 rounded-md text-sm outline-none border border-gray-300"
//                   readOnly
//                 />
//               </div>
//             )
//           )}
//         </div>

//         {/* Monthly Payment Collection */}
//         <div className="bg-gray-100 p-4 border-t border-gray-200">
//           <p className="font-semibold mb-2">Monthly Payment Collection</p>
//           <div className="grid grid-cols-4 text-sm font-medium border-b border-gray-300 pb-2">
//             <p>Status</p>
//             <p>Date</p>
//             <p>Amount</p>
//             <p>Agent Info</p>
//           </div>
//           <div className="grid grid-cols-4 text-sm mt-2 items-center">
//             <p className="text-gray-500">Payment per-month</p>
//             <p className="text-gray-500">12 June 2025</p>
//             <p className="text-gray-500">85</p>
//             <input
//               type="text"
//               className="border border-gray-300 p-2 rounded-md text-sm w-full"
//               placeholder="Agent name"
//             />
//           </div>
//         </div>

//         {/* Hide Transaction Summary */}
//         <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer p-4">
//           Hide transaction Summary
//         </p>

//         {/* Payment History */}
//         <div className="p-4 border-t border-gray-200">
//           <p className="font-semibold mb-2">Payment History</p>
//           <div className="grid grid-cols-4 text-sm font-medium border-b border-gray-300 pb-2">
//             <p>Status</p>
//             <p>Date</p>
//             <p>Amount</p>
//             <p>Agent Info</p>
//           </div>
//           {['Ajay', 'Ajay', 'Pranav', 'Pranav'].map((agent, index) => (
//             <div key={index} className="grid grid-cols-4 text-sm mt-2 items-center">
//               <p className="text-gray-500">Payment per-month</p>
//               <p className="text-gray-500">12 June 2025</p>
//               <p className="text-gray-500">85</p>
//               <p className="text-gray-500">{agent}</p>
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <div className="bg-gray-100 p-4 rounded-b-2xl border-t border-gray-200">
//           <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-semibold">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;


import React from "react";

const ProfileCard = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        {/* Profile Section */}
        <div className="bg-gray-100 p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <h2 className="text-lg font-semibold">Ajay kumar</h2>
          <p className="text-sm text-gray-500">abc pvt ltd</p>
        </div>

        {/* Manager & Seller Details */}
        <div className="grid grid-cols-2 gap-4 p-6">
          {["Manager Name", "Seller name", "Company name", "Ph no", "Licence number", "Email.ID"].map(
            (label, index) => (
              <div key={index}>
                <p className="font-semibold text-sm mb-1">{label}</p>
                <input
                  type="text"
                  value={[
                    "Ajay kumar",
                    "JOE JOY",
                    "abc pvt ltd",
                    "6238945012",
                    "1854879652",
                    "Ajay132@gmail.com",
                  ][index]}
                  className="w-full p-2 bg-gray-100 rounded-md text-sm border border-gray-300 outline-none"
                  readOnly
                />
              </div>
            )
          )}
        </div>

        {/* Monthly Payment Collection */}
        <div className="bg-gray-100 p-4 border-t border-gray-200">
          <p className="font-semibold mb-2">Monthly Payment Collection</p>
          <div className="grid grid-cols-4 text-sm font-medium border-b border-gray-300 pb-2">
            <p>Status</p>
            <p>Date</p>
            <p>Amount</p>
            <p>Agent Info</p>
          </div>
          <div className="grid grid-cols-4 text-sm mt-2 items-center">
            <p className="text-gray-500">Payment per-month</p>
            <p className="text-gray-500">12 June 2025</p>
            <p className="text-gray-500">85</p>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md text-sm w-full"
              placeholder="Agent name"
            />
          </div>
        </div>

        {/* Hide Transaction Summary */}
        <p className="text-[#B3DB48] text-right text-sm font-semibold cursor-pointer p-4">
          Hide transaction Summary
        </p>

        {/* Payment History */}
        <div className="p-4 border-t border-gray-200">
          <p className="font-semibold mb-2">Payment History</p>
          <div className="grid grid-cols-4 text-sm font-medium border-b border-gray-300 pb-2">
            <p>Status</p>
            <p>Date</p>
            <p>Amount</p>
            <p>Agent Info</p>
          </div>
          {["Ajay", "Ajay", "Pranav", "Pranav"].map((agent, index) => (
            <div key={index} className="grid grid-cols-4 text-sm mt-2 items-center">
              <p className="text-gray-500">Payment per-month</p>
              <p className="text-gray-500">12 June 2025</p>
              <p className="text-gray-500">85</p>
              <p className="text-gray-500">{agent}</p>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="bg-gray-100 p-4 rounded-b-2xl border-t border-gray-200">
          <button className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
