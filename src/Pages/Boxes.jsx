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
