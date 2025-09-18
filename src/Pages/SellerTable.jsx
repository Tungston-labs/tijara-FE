import React from "react";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  fetchSubscriptionHistory,
  fetchUserList,
  getUserById,
} from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { format } from "date-fns";

export default function SellerTableContent({
  sellers,
  onEditClick,
  currentPage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Sellers:", sellers);

  const onDeleteClick = async (seller) => {
    const confirmResult = await Swal.fire({
      title: `Delete ${seller.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#B3DB48",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const result = await dispatch(
        deleteUser({ role: "seller", id: seller._id })
      );

      if (deleteUser.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${seller.name} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Trigger parent refresh
        dispatch(fetchUserList({ role: "seller" }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: result.payload || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <div
        className="w-full lg:w-full md:w-4xl   mx-auto rounded-lg p-4"
        style={{ backgroundColor: "#F6F9EF" }}
      >
        <div className="p-3 rounded-lg shadow-sm lg:w-full 4xl:text-3xl 5xl:text-3xl lg:text-[9px] xl:text-sm  grid grid-cols-8 font-[Nunito] font-bold text-black text-center text-sm whitespace-wrap bg-white">
          <div>No</div>
          <div>Seller Name</div>
          <div>Ph no </div>
          <div>Licence Number</div>
          <div>Plan Expiring</div>
          <div>Payment type </div>
          <div>Edit</div>
          <div>Delete</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3 mt-3">
          {sellers.map((seller, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-sm lg:text-[9px] 4xl:text-3xl 5xl:text-3xl xl:text-sm  grid grid-cols-8 text-center items-center text-sm whitespace-nowrap"
            >
              <div className="text-gray-700 font-[Nunito]">
                {index + 1 + (currentPage - 1) * 10}
              </div>
              <div
                className="text-[#B3DB48] font-[Nunito] cursor-pointer hover:underline"
                onClick={() => {
                  navigate(`/profile/seller/${seller._id}`); // pass role as string
                  dispatch(fetchSubscriptionHistory(seller._id));
                  dispatch(getUserById({ role: "seller", id: seller._id })); // pass object with role and id
                }}
              >
                {seller.name}
              </div>

              <div className="text-gray-700">{seller.phone}</div>

              <div className="text-gray-700">{seller.tradeLicenseNumber}</div>

              <div className="text-gray-700">
                {seller.tradeLicenseExpiry
                  ? format(new Date(seller.tradeLicenseExpiry), "yyyy-MM-dd")
                  : "N/A"}
              </div>

              <div className="text-gray-700">
                {seller.subscription?.paymentType || "N/A"}
              </div>

              <div className="flex justify-center ">
                <button
                  onClick={() => onEditClick(seller)}
                  className="text-[#B3DB48] hover:text-green-600"
                >
                  <Pencil className="w-2 h-2 sm:w-2 sm:h-6 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:h-6 xl:w-6 4xl:h-10 4xl:w-10 5xl:w-10" />
                </button>
              </div>

              <div className="flex justify-center ">
                <button
                  onClick={() => onDeleteClick(seller)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-2 h-2 sm:w-2 sm:h-6 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:h-6 xl:w-6 4xl:h-10 4xl:w-10 5xl:w-10" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
