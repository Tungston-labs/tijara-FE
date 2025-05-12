// import { Users } from "lucide-react";
// const stats = [
//   { title: "New users", value: 145, change: "+10%", color: "bg-green-100", textColor: "text-green-600" },
//   { title: "Buyer", value: 12, change: "+10%", color: "bg-green-100", textColor: "text-green-600" },
//   { title: "Seller", value: 234, change: "-10%", color: "bg-red-100", textColor: "text-red-600" },
//   { title: "No of enquiry", value: 775, change: "+10%", color: "bg-green-100", textColor: "text-green-600" },
// ];

// export default function DashboardWithLayout() {
//   return (
//     <div className="flex bg-[#E9E9E9] min-h-screen">
//       {/* Sidebar */}
      

//       {/* Main content */}
//       <div className="flex-1 p-6">
        
//         <h2 className="text-xl font-[Nunito] font-bold mb-4">Dashboard</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col relative h-44">
//               <div className="flex items-center gap-2">
//                 <div className="bg-[#B3DB48] p-2 rounded-full">
//                   <Users className="w-5 h-5 text-white" />
//                 </div>
//                 <p className="text-md font-[Nunito] font-bold">{stat.title}</p>
//               </div>
//               <p className="text-3xl font-[Nunito] font-bold text-center mt-auto">{stat.value}</p>
//               <div className={`text-xs px-2 py-1 rounded-md ${stat.color} ${stat.textColor} absolute bottom-2 right-2`}>
               
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { Users } from "lucide-react";

// const stats = [
//   { title: "Buyer", value: 12 },
//   { title: "Seller", value: 234 },
//   { title: "Approval", value: 234 },
// ];

// export default function DashboardWithLayout() {
//   return (
//     <div className="min-h-screen bg-[#E9E9E9] p-10 font-[Nunito]">
//       <h2 className="text-[28px] font-bold mb-8">Dashboard</h2>

//       <div className="flex gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="w-[400px] h-[180px] bg-white rounded-[20px] p-6 flex flex-col justify-between shadow"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-[50px] h-[50px] bg-[#B3DB48] rounded-full flex items-center justify-center">
//                 <Users className="text-white w-[22px] h-[22px]" />
//               </div>
//               <p className="text-[20px] font-medium text-black">{stat.title}</p>
//             </div>
//             <p className="text-[40px] font-bold text-black text-right">{stat.value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import { Users } from "lucide-react";

// const stats = [
//   { title: "Buyer", value: 12 },
//   { title: "Seller", value: 234 },
//   { title: "Approval", value: 234 },
// ];

// export default function DashboardWithLayout() {
//   return (
//     <div className="flex bg-[#E9E9E9] min-h-screen">
//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-xl font-[Nunito] font-bold mb-4">Dashboard</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-44 w-full"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="bg-[#B3DB48] w-10 h-10 rounded-full flex items-center justify-center">
//                   <Users className="w-5 h-5 text-white" />
//                 </div>
//                 <p className="text-md font-[Nunito] font-semibold text-black">{stat.title}</p>
//               </div>
//               <p className="text-3xl font-[Nunito] font-bold text-black text-right">{stat.value}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { Users } from "lucide-react";

const stats = [
  { title: "Buyer", value: 12 },
  { title: "Seller", value: 234 },
  { title: "Approval", value: 234 },
];

export default function DashboardWithLayout() {
  return (
    <div className="flex bg-[#E9E9E9] min-h-screen">
      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-[Nunito] font-bold mb-4">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-32 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#B3DB48] w-9 h-9 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-[Nunito] font-semibold text-black">{stat.title}</p>
              </div>
              <p className="text-2xl font-[Nunito] font-bold text-black text-right">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
