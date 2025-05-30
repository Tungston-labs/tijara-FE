import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAgentList,
  fetchSubscriptionHistory,
  getUserById,
} from "../Redux/userSlice";
import Select from "react-select";
import { useParams } from "react-router-dom";

export default function ProfileTransactionCard() {
  const dispatch = useDispatch();
  const { agentList } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("");
  const { transactions = [], loading, error } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.user);
  const { role, id } = useParams();
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    licenceNumber: user?.licenceNumber || "",
    agent: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone: user.phone || "",
        licenceNumber: user.licenceNumber || "",
        agent: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchSubscriptionHistory(user._id));
      console.log("Fetching subscription history for userId:", user._id);
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (id) {
      dispatch(getUserById({ role, id }));
    }

    const handleEsc = (e) => e.key === "Escape" && setIsFilterOpen(false);
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, role, id]);
  console.log("Fetching user:", { role, id });

  const [searchInput, setSearchInput] = useState("");
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim() !== "") {
        dispatch(fetchAgentList({ search: searchInput }))
          .unwrap()
          .then((data) => {
            const filtered = data.agents.map((agent) => ({
              label: agent.agentName,
              value: agent.agentName,
            }));
            setFilteredAgents(filtered);
          })
          .catch((err) => {
            console.error("Error fetching agents:", err);
          });
      } else {
        setFilteredAgents([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  useEffect(() => {
    dispatch(fetchAgentList())
      .unwrap()
      .then((data) => {
        console.log("Fetched initial agent list:", data);
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAgentSelect = (selectedOption) => {
    const page = 1;
    const search = selectedOption?.value || "";
    dispatch(fetchAgentList({ page, search }));
    setFormData({ ...formData, agent: selectedOption?.value || "" });
  };

  return (
    <div className="min-h-screen bg-[#E9E9E9] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-4 sm:p-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
          {/* Profile Block */}
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <img
              src="https://ui-avatars.com/api/?name=Ajay+Kumar&background=cccccc&color=000&size=128"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <h2 className="text-lg sm:text-xl font-[Nunito] font-bold mt-2">
              Ajay kumar
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">abc pvt ltd</p>
          </div>

          {/* Info Section */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-[Nunito] font-bold text-xs sm:text-sm">
                Email.ID
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {formData.email}
              </p>
              <p className="font-semibold text-xs sm:text-sm mt-4">
                Licence number
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {formData.licenceNumber}
              </p>
            </div>

            <div>
              <p className="font-[Nunito] font-bold text-xs sm:text-sm">
                Ph no
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {formData.phone}
              </p>
            </div>
          </div>

          {/* Plan & Agent Assignment */}
          <div className="w-full md:w-auto border rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:gap-4">
            <div>
              <p className="text-xs sm:text-sm font-[Nunito] font-bold">
                Plan Expiring
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">21-12-2025</p>
            </div>

            <div className="w-full md:w-60">
              <p className="text-xs sm:text-sm font-[Nunito] font-bold">
                Assign an Agent
              </p>
              <Select
                options={filteredAgents}
                onInputChange={(val) => {
                  console.log("search", val);
                  setSearchInput(val);
                }}
                onChange={handleAgentSelect}
                placeholder="Assign an Agent"
                isClearable
                value={
                  formData.agent
                    ? { label: formData.agent, value: formData.agent }
                    : null
                }
                className="text-xs sm:text-sm"
              />
            </div>

            <div className="mt-2 md:mt-0">
              <button className="bg-[#B3DB48] w-full md:w-auto px-3 sm:px-5 py-2 text-white rounded-md font-[Nunito] font-bold text-xs sm:text-sm">
                Sub
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-center text-[#B3DB48] font-[Nunito] font-bold mb-3 sm:mb-4 text-base sm:text-lg">
            Transaction Summary
          </h3>
          {loading && (
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Loading...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 text-xs sm:text-sm">
              {error}
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-2 sm:px-4 py-2 font-[Nunito] font-bold text-black">
                    Status
                  </th>
                  <th className="px-2 sm:px-4 py-2 font-[Nunito] font-bold text-black">
                    Date
                  </th>
                  <th className="px-2 sm:px-4 py-2 font-[Nunito] font-bold text-black">
                    Amount
                  </th>
                  <th className="px-2 sm:px-4 py-2 font-[Nunito] font-bold text-black">
                    Agent Info
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 font-[Nunito]"
                  >
                    <td className="px-2 sm:px-4 py-2 text-gray-500">
                      {txn.status}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-500">
                      {txn.date}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-500">
                      {txn.amount}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <input
                        type="text"
                        value={txn.agent}
                        readOnly
                        className="bg-gray-100 rounded px-2 py-1 w-full text-xs sm:text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <button className="bg-[#B3DB48] w-full py-2 sm:py-3 text-white rounded-md text-sm sm:text-lg font-[Nunito] font-bold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
