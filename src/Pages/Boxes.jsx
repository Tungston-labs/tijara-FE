import { Users, FileClock, Grid, Grid3X3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

export default function DashboardWithLayout() {
  const [stats, setStats] = useState({
    buyer: 0,
    seller: 0,
    approval: 0,
    category: 0,
    subcategory: 0,
  });
  const axiosPrivate = useAxiosPrivate();
  const [monthlyData, setMonthlyData] = useState([]);

  const cards = [
    {
      title: "Approval",
      icon: (
        <FileClock className="w-4 h-4 xl:w-8 xl:h-8 4xl:w-14 4xl:h-14 5xl:w-36 5xl:h-24 text-white" />
      ),
      value: stats.approval,
    },
    {
      title: "Category",
      icon: (
        <Grid className="w-4 h-4 xl:w-8 xl:h-8 4xl:w-14 4xl:h-14 5xl:w-36 5xl:h-24 text-white" />
      ),
      value: stats.category,
    },
    {
      title: "Sub category",
      icon: (
        <Grid3X3 className="w-4 h-4 xl:w-8 xl:h-8 4xl:w-14 4xl:h-14 5xl:w-36 5xl:h-24 text-white" />
      ),
      value: stats.subcategory,
    },
  ];

  const bottomCards = [
    {
      title: "Buyer",
      icon: (
        <Users className="w-4 h-4 xl:w-8 xl:h-8 4xl:w-14 4xl:h-14 5xl:w-36 5xl:h-24 text-white" />
      ),
      value: stats.buyer,
    },
    {
      title: "Seller",
      icon: (
        <Users className="w-4 h-4 xl:w-8 xl:h-8 4xl:w-14 4xl:h-14 5xl:w-36 5xl:h-24 text-white" />
      ),
      value: stats.seller,
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res1 = await axiosPrivate.get(
          "https://api.thijara.me/admin/auth/get-count"
        );
        setStats(res1.data);

        const res2 = await axiosPrivate.get(
          "https://api.thijara.me/admin/auth/monthly-stats"
        );
        setMonthlyData(res2.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-[#E9E9E9] h-screen">
      <div className="flex-1 px-4 xl:px-6 py-12 xl:py-16 2xl:px-12 2xl:py-20 4xl:px-16 4xl:py-32 5xl:px-24 5xl:py-36 mx-auto w-full overflow-y-scroll">
        <h2 className="text-xl xl:text-2xl 2xl:text-3xl 4xl:text-5xl 5xl:text-7xl font-[Nunito] font-bold mb-4 xl:mb-5 2xl:mb-6  4xl:mb-8 5xl:mb-16">
          Dashboard
        </h2>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-12 4xl:gap-16 5xl:gap-28 mb-10 4xl:mb-20 5xl:mb-28">
          {cards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl 4xl:rounded-3xl 5xl:rounded-[3.5rem] shadow-md p-4 xl:p-6 flex flex-col justify-between 4xl:h-auto 2xl:p-7 4xl:p-11 5xl:p-16 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#B3DB48] w-9 h-9 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 4xl:w-20 4xl:h-20 5xl:w-36 5xl:h-36 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <p className="text-lg xl:text-xl 2xl:text-2xl 4xl:text-4xl 5xl:text-6xl 4xl:px-4 5xl:px-8 font-[Nunito] text-black">
                  {stat.title}
                </p>
              </div>
              <p className="text-2xl xl:text-3xl 2xl:text-4xl 4xl:text-6xl 5xl:text-8xl font-[Nunito] font-bold text-black text-right">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Monthly Analytics Header + Dots */}
        {/* Monthly Analytics Header + Dots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4 xl:mb-5 2xl:mb-6 4xl:mb-8 5xl:mb-16">
          <div className="col-span-1 lg:col-span-2 flex justify-between items-center">
            <h2 className="text-xl xl:text-2xl 2xl:text-3xl 4xl:text-5xl 5xl:text-7xl font-[Nunito] font-bold">
              Monthly Analytics
            </h2>
            <div className="flex gap-6 4xl:gap-12 5xl:gap-16">
              <div className="flex items-center gap-2 4xl:gap-4 5xl:gap-6">
                <span className="w-3 h-3 xl:w-4 xl:h-4 4xl:w-5 4xl:h-5 5xl:w-10 5xl:h-10 rounded-full bg-[#EB008A]"></span>
                <span className="text-xs 2xl:text-sm 5xl:text-4xl font-[Nunito] font-medium">
                  Buyer
                </span>
              </div>
              <div className="flex items-center gap-2 4xl:gap-4 5xl:gap-6">
                <span className="w-3 h-3 xl:w-4 xl:h-4  4xl:w-5 4xl:h-5 5xl:w-10 5xl:h-10 rounded-full bg-[#84CC16]"></span>
                <span className="text-xs 2xl:text-sm  5xl:text-4xl font-[Nunito] font-medium">
                  Seller
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph + Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 2xl:gap-8 4xl:gap-12 5xl:gap-20">
          {/* Graph */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md min-h-[340px]">
            <div className="pt-4 pb-2  5xl:p-8 h-[400px] xl:h-[450px] 4xl:min-h-[700px] 5xl:h-[1100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize:
                        window.innerWidth >= 3200
                          ? 28
                          : window.innerWidth >= 2560
                          ? 20
                          : window.innerWidth >= 1920
                          ? 16
                          : 12,
                    }}
                  />
                  <YAxis
                    tickCount={6}
                    domain={[0, "auto"]}
                    interval="preserveStartEnd"
                    tick={{
                      fontSize:
                        window.innerWidth >= 3200
                          ? 28
                          : window.innerWidth >= 2560
                          ? 20
                          : window.innerWidth >= 1920
                          ? 16
                          : 12,
                    }}
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
          <div className="flex flex-col gap-6 xl:gap-8 2xl:gap-12 4xl:gap-16 5xl:gap-28 justify-center">
            {bottomCards.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl 4xl:rounded-3xl 5xl:rounded-[3.5rem] shadow-md p-4 xl:p-6 flex flex-col justify-between 2xl:p-7 4xl:p-11 5xl:p-16 w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#B3DB48] w-9 h-9 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 4xl:w-20 4xl:h-20 5xl:w-36 5xl:h-36 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-lg xl:text-xl 2xl:text-2xl 4xl:text-4xl 5xl:text-6xl 4xl:px-4  5xl:px-8 font-[Nunito] text-black">
                    {stat.title}
                  </p>
                </div>
                <p className="text-2xl xl:text-3xl 2xl:text-4xl 4xl:text-6xl 5xl:text-8xl font-[Nunito] font-bold text-black text-right">
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
