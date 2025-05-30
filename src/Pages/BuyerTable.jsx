import { Pencil, Trash, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  fetchSubscriptionHistory,
  fetchUserList,
  getUserById,
} from "../Redux/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function BuyerTableContent({
  buyers,
  currentPage,
  onEditClick,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDeleteClick = async (buyer) => {
    const confirmResult = await Swal.fire({
      title: `Delete ${buyer.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const result = await dispatch(
        deleteUser({ role: "buyer", id: buyer._id })
      );

      if (deleteUser.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${buyer.name} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Trigger parent refresh
        dispatch(fetchUserList({ role: "buyer" }));
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
    <div
      className="w-full mx-auto rounded-lg p-4"
      style={{ backgroundColor: "#F6F9EF" }}
    >
      <div className="p-3 rounded-lg shadow-sm grid grid-cols-8 font-[Nunito] font-bold text-black text-center text-sm whitespace-nowrap bg-[#F9FAFB]">
        <div>No</div>
        <div>Buyer name</div>
        <div>Ph no</div>
        <div>Plan Expiring</div>
        <div>Payment type</div>
        {/* <div>Buyer/seller</div>  */}
        <div>Edit</div>
        <div>Delete</div>
      </div>

      {/* Table Body */}
      <div className="space-y-3 mt-3">
        {buyers.map((buyer, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-sm grid grid-cols-8 text-center items-center text-sm whitespace-nowrap"
          >
            <div className="text-gray-700 font-medium">
              {index + 1 + (currentPage - 1) * 10}
            </div>
            <div
              className="text-gray-700 font-medium"
              onClick={() => {
                navigate(`/profile/buyer/${buyer._id}`); // pass role as string
                dispatch(fetchSubscriptionHistory(buyer._id));
                dispatch(getUserById({ role: "buyer", id: buyer._id })); // pass object with role and id
              }}
            >
              {buyer.name}
            </div>
            <div className="text-gray-700">{buyer.phone}</div>

            <div className="text-gray-700">
              {buyer.subscription?.endDate
                ? new Date(buyer.subscription.endDate).toLocaleDateString()
                : "N/A"}
            </div>

            <div className="text-gray-700">
              {buyer.subscription?.paymentType || "N/A"}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => onEditClick(buyer)}
                className="text-[#B3DB48] hover:text-green-600"
              >
                <Pencil size={16} />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => onDeleteClick(buyer)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}