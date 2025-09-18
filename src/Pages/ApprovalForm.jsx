import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { approveTradeLicense, approveUsers, getUserById } from "../Redux/userSlice";
import Swal from "sweetalert2";

export default function UserApproval() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getUserById({ id }));
    }
  }, [dispatch, id]);

  console.log("Fetching user:", { id });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!user) return null;
  
 const handleApprove = async (userId) => {


  if (user?.tradeLicenseStatus === "pending") {
    // Approve trade license
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Approve this seller's trade license?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B3DB48",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await dispatch(
        approveTradeLicense({ userId, action: "approve" })
      );

      if (approveTradeLicense.fulfilled.match(result)) {
        Swal.fire("Approved!", "Seller has been approved.", "success");
        navigate("/approveseller");
      } else {
        Swal.fire("Failed", result.payload || "Approval failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  } else {
    // Approve regular buyer or seller without license logic
    try {
        console.log("Dispatching approveUsers with:", {
  userId,
  status: "approved",
});
      const resultAction = await dispatch(
        approveUsers({ userId,  status: "approved", role: user.role})
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        Swal.fire("Success", "User approved successfully", "success");

        if (user?.role === "buyer") {
          navigate("/approvebuyer");
        } else {
          navigate("/approveseller");
        }
      } else {
        Swal.fire("Error", "Approval failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred", "error");
    }
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

  if (user?.tradeLicenseStatus === "pending") {
    // Decline trade license
    try {
      const result = await dispatch(
        approveTradeLicense({ userId, action: "reject" })
      );

      if (approveTradeLicense.fulfilled.match(result)) {
        Swal.fire("Declined!", "Trade license has been rejected.", "success");
        navigate("/approveseller");
      } else {
        Swal.fire("Error", result.payload || "Failed to decline", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  } else {
    // Decline buyer or regular seller
    try {
      const resultAction = await dispatch(
        approveUsers({ userId, role: user?.role, status: "rejected", })
      );

      if (approveUsers.fulfilled.match(resultAction)) {
        Swal.fire("Declined!", "User has been declined.", "success");

        if (user?.role === "buyer") {
          navigate("/approvebuyer");
        } else {
          navigate("/approveseller");
        }
      } else {
        Swal.fire("Error", "Failed to decline user.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  }
};


  return (
    <div className="min-h-screen bg-[#E7E7E7] p-6">
      {/* Breadcrumb & Title */}
      <div className="mb-4 text-sm text-gray-600 font-[Nunito]">
        Approval &gt; Seller
      </div>
      <h1 className="text-2xl 4xl:text-4xl 5xl:text-4xl font-semibold font-[Nunito] mb-6">Seller</h1>

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
          {user?.tradeLicenseStatus === "pending" && (
            <>
              {/* Left Side */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
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
                    value={user?.companyName || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Trade license Number</label>
                  <input
                    type="text"
                    value={user?.tradeLicenseNumber || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
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
          {user?.role === "buyer" && (
            <>
              {/* Buyer layout: only show relevant fields */}
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
      <div className="flex justify-end gap-6 mt-8 font-[Nunito]">
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
