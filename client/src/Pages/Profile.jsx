import { useState } from "react";

export default function ProfileTransactionCard() {
  const [formData, setFormData] = useState({
    email: "Ajay132@gmail.com",
    phone: "6238945012",
    licenceNumber: "1854879652",
    agent: "",
  });

  const [transactions] = useState([
    { status: "Payment per-month", date: "12 June 2025", amount: 85, agent: "Ajay" },
    { status: "Payment per-month", date: "12 June 2025", amount: 85, agent: "Ajay" },
    { status: "Payment per-month", date: "12 June 2025", amount: 85, agent: "Pranav" },
    { status: "Payment per-month", date: "12 June 2025", amount: 85, agent: "Pranav" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
          {/* Profile Block */}
          <div className="flex flex-col items-center w-full md:w-auto">
            <img
              src="https://ui-avatars.com/api/?name=Ajay+Kumar&background=cccccc&color=000&size=128"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <h2 className="text-xl font-[Nunito] font-bold mt-2">Ajay kumar</h2>
            <p className="text-sm text-gray-500">abc pvt ltd</p>
          </div>

          {/* Info Section */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-[Nunito] font-bold text-sm">Email.ID</p>
              <p className="text-gray-600 text-sm">{formData.email}</p>
              <p className="font-semibold text-sm mt-4">Licence number</p>
              <p className="text-gray-600 text-sm">{formData.licenceNumber}</p>
            </div>
            <div>
              <p className="font-[Nunito] font-bold text-sm">Ph no</p>
              <p className="text-gray-600 text-sm">{formData.phone}</p>
            </div>
          </div>

          {/* Plan & Agent Assignment */}
          <div className="w-full md:w-auto border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="md:mr-4">
              <p className="text-sm font-[Nunito] font-bold">Plan Expiring</p>
              <p className="text-gray-500 text-sm">21-12-2025</p>
            </div>
            <div className="md:mr-4">
              <p className="text-sm font-[Nunito] font-bold">Assign an Agent</p>
              <select
                name="agent"
                value={formData.agent}
                onChange={handleChange}
                className="bg-gray-100 px-3 py-2 rounded-md text-sm"
              >
                <option value="">Assign an Agent</option>
                <option value="Ajay">Ajay</option>
                <option value="Pranav">Pranav</option>
              </select>
            </div>
            <div className="mt-2 md:mt-5">
              <button className="bg-[#B3DB48] px-5 py-2 text-white rounded-md font-[Nunito] font-bold">
                Sub
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="mt-10">
          <h3 className="text-center text-[#B3DB48] font-[Nunito] font-bold mb-4 text-lg">
            Transaction Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 ">
                  <th className="px-4 py-2 font-[Nunito] font-bold text-black ">Status</th>
                  <th className="px-4 py-2 font-[Nunito] font-bold text-black">Date</th>
                  <th className="px-4 py-2 font-[Nunito] font-bold text-black">Amount</th>
                  <th className="px-4 py-2 font-[Nunito] font-bold text-black">Agent Info</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index} className="border-b border-gray-100 font-[Nunito] ">
                    <td className="px-4 py-2 text-gray-500">{txn.status}</td>
                    <td className="px-4 py-2 text-gray-500">{txn.date}</td>
                    <td className="px-4 py-2 text-gray-500">{txn.amount}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={txn.agent}
                        readOnly
                        className="bg-gray-100 rounded px-3 py-1 w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-[#B3DB48] w-full py-3 text-white rounded-md text-lg font-[Nunito] font-bold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}


