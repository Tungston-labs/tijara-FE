import {
  Users,
  FileClock,
  Grid,
  Grid3X3
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate"

export default function DashboardWithLayout() {
  const [stats, setStats] = useState({
    buyer: 0,
    seller: 0,
    approval: 0,
    category: 0,
    subcategory: 0,
  });
const axiosPrivate=useAxiosPrivate()
  const [monthlyData, setMonthlyData] = useState([]);

  const cards = [
    {
      title: "Approval",
      icon: <FileClock className="w-4 h-4 text-white" />,
      value: stats.approval,
    },
    {
      title: "Category",
      icon: <Grid className="w-4 h-4 text-white" />,
      value: stats.category,
    },
    {
      title: "Sub category",
      icon: <Grid3X3 className="w-4 h-4 text-white" />,
      value: stats.subcategory,
    },
  ];

  const bottomCards = [
    {
      title: "Buyer",
      icon: <Users className="w-4 h-4 text-white" />,
      value: stats.buyer,
    },
    {
      title: "Seller",
      icon: <Users className="w-4 h-4 text-white" />,
      value: stats.seller,
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res1 = await axiosPrivate.get("https://api.thijara.me/admin/auth/get-count");
        setStats(res1.data);

        const res2 = await axiosPrivate.get("https://api.thijara.me/admin/auth/monthly-stats");
        setMonthlyData(res2.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchStats();
  }, []);

  return (
<div className="flex bg-[#E9E9E9] min-h-screen ">
<div className="flex-1 px-6 py-6 max-w-screen-2xl mx-auto w-full">
    <h2 className="text-3xl font-[Nunito] font-bold mb-4">Dashboard</h2>

    {/* Top Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {cards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-32 w-full"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#B3DB48] w-9 h-9 rounded-full flex items-center justify-center">
              {stat.icon}
            </div>
            <p className="text-2xl font-[Nunito] font-semibold text-black">
              {stat.title}
            </p>
          </div>
          <p className="text-2xl font-[Nunito] font-bold text-black text-right">
            {stat.value}
          </p>
        </div>
      ))}
    </div>

    {/* Monthly Analytics Header + Dots */}
  {/* Monthly Analytics Header + Dots */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
  <div className="col-span-1 lg:col-span-2 flex justify-between items-center">
    <h2 className="text-2xl font-[Nunito] font-bold">Monthly Analytics</h2>
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
        <span className="text-2xl font-[Nunito] font-medium">Buyer</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#84CC16]"></span>
        <span className="text-2xl font-[Nunito] font-medium">Seller</span>
      </div>
    </div>
  </div>
</div>



    {/* Graph + Bottom Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Graph */}
   <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md min-h-[340px]">
  <div className="px-4 pt-4 pb-2"> 
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={monthlyData}
        margin={{ top: 20, right: 30, left: 10, bottom: 10 }} 
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickCount={6}
          domain={[0, 'auto']}
          interval="preserveStartEnd"
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="buyer"
          stroke="#EF4444"
          activeDot={{ r: 6 }}
          name="Buyer"
        />
        <Line
          type="monotone"
          dataKey="seller"
          stroke="#84CC16"
          activeDot={{ r: 6 }}
          name="Seller"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>


      {/* Bottom Cards */}
      <div className="flex flex-col gap-10 mt-16">
        {bottomCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-32 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#B3DB48] w-9 h-9 rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
              <p className="text-2xl font-[Nunito] font-semibold text-black">
                {stat.title}
              </p>
            </div>
            <p className="text-2xl font-[Nunito] font-bold text-black text-right">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


  );
}
