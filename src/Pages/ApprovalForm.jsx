import React from "react";

export default function SellerApproval() {
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
              src="https://via.placeholder.com/100x100.png?text=Profile"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Nunito] text-[14px]">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
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
                  className="w-full px-4 py-2 bg-[#F2F2F2] rounded-r-md outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Trade license Number</label>
              <input
                type="text"
                placeholder="Trade license Number"
                className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
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
                  className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 invisible">Last</label>
                <input
                  type="text"
                  placeholder="Last"
                  className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Upload Trade License Copy</label>
              <textarea
                placeholder=""
                rows="5"
                className="w-full px-4 py-2 bg-[#F2F2F2] rounded-md outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8 font-[Nunito]">
        <button className="px-6 py-2 border border-red-400 text-red-500 rounded-md">
          Decline
        </button>
        <button className="px-6 py-2 border border-[#B3DB48] text-[#779328] rounded-md">
          Approve
        </button>
      </div>
    </div>
  );
}
