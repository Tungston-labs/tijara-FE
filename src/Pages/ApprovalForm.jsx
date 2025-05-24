import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { approveUsers, getUserById } from "../Redux/userSlice";
import Swal from "sweetalert2";

export default function UserApproval() {
  const dispatch = useDispatch();
  const { role, id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getUserById({ role, id }));
    }
  }, [dispatch, role, id]);

  console.log("Fetching user:", { role, id });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!user) return null;
  const handleApprove = async (userId) => {
    try {
      const resultAction = await dispatch(
        approveUsers({ userId, role, status: "approved" })
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        Swal.fire("Success", "User approved successfully", "success");

        // Navigate based on role
        if (role === "buyer") {
          navigate("/approvebuyer");
        } else if (role === "seller") {
          navigate("/approveseller");
        } else {
          navigate("/"); // default fallback
        }
      } else {
        console.error("Approval failed");
        Swal.fire("Error", "Approval failed", "error");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      Swal.fire("Error", "An error occurred", "error");
    }
  };

  const handleDecline = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action will decline the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, decline",
    });

    if (!confirmResult.isConfirmed) return;

    // Step 2: Proceed with decline
    try {
      const resultAction = await dispatch(
        approveUsers({ userId, role, status: "rejected" })
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        await Swal.fire("Declined!", "User has been declined.", "success");

        // Step 3: Navigate based on role
        if (role === "buyer") {
          navigate("/approvebuyer");
        } else if (role === "seller") {
          navigate("/approveseller");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire("Error", "Failed to decline user.", "error");
      }
    } catch (error) {
      console.error("Error declining user:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#E7E7E7] p-6">
      {/* Breadcrumb & Title */}
      <div className="mb-4 text-sm text-gray-600 font-[Nunito]">
        Approval &gt; Seller
      </div>
      <h1 className="text-2xl font-semibold font-[Nunito] mb-6">Seller</h1>

      {/* Card */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={
                user?.profileImage ||
                "https://via.placeholder.com/100x100.png?text=Profile"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Nunito] text-[14px]">
          {role === "seller" && (
            <>
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Phone Number</label>
                  <div className="flex">
                    <span className="px-4 py-2 bg-[#F2F2F2] rounded-l-md text-gray-600 border-r border-gray-300">
                      +91
                    </span>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={user?.phone || ""}
                      readOnly
                      className="w-full px-4 py-2 bg-[#F2F2F2] rounded-r-md outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={user?.companyName || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Trade license Number</label>
                  <input
                    type="text"
                    placeholder="Trade license Number"
                    value={user?.tradeLicenseNumber || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Manager Name</label>
                    <input
                      type="text"
                      placeholder="First"
                      value={user?.managerName || ""}
                      readOnly
                      className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 invisible">Last</label>
                    <input
                      type="text"
                      placeholder="Last"
                      disabled
                      readOnly
                      className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">
                    Upload Trade License Copy
                  </label>
                  <textarea
                    rows="5"
                    value={user?.tradeLicenseCopy || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {role === "buyer" && (
            <>
              {/* Buyer layout: only show relevant fields, same structure */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Phone Number</label>
                  <div className="flex">
                    <span className="px-4 py-2 bg-[#F2F2F2] rounded-l-md text-gray-600 border-r border-gray-300">
                      +91
                    </span>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={user?.phone || ""}
                      readOnly
                      className="w-full px-4 py-2 bg-[#F2F2F2] rounded-r-md outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8 font-[Nunito]">
        <button
          onClick={() => handleDecline(user._id)}
          className="px-6 py-2 border border-red-400 text-red-500 rounded-md"
        >
          Decline
        </button>
        <button
          onClick={() => handleApprove(user._id)}
          className="px-6 py-2 border border-[#B3DB48] text-[#779328] rounded-md"
        >
          Approve
        </button>
      </div>
    </div>
  );
}
