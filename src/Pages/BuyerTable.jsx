import { Pencil, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUserList } from "../Redux/userSlice";
import Swal from "sweetalert2";
export default function BuyerTableContent({
  buyers,

  onEditClick,
}) {
  const dispatch=useDispatch();
  const onDeleteClick = async (buyer) => {
    if (!window.confirm(`Delete ${buyer.name}?`)) return;
  
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
      className="max-w-6xl mx-auto rounded-lg p-4"
      style={{ backgroundColor: "#F6F9EF" }}
    >
      <div className="p-3 rounded-lg shadow-sm grid grid-cols-8 font-[Nunito] font-bold text-black text-center text-sm whitespace-nowrap bg-white">
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
            <div className="text-gray-700 font-medium">{index + 1}</div>
            <div className="text-gray-700 font-medium">{buyer.name}</div>
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
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
