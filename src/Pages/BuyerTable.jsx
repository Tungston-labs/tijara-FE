import { Pencil, Trash } from "lucide-react";
export default function BuyerTable({ buyers, onDeleteClick, onEditClick }) {

  return (
    <div className="max-w-6xl mx-auto rounded-lg p-4" style={{ backgroundColor: "#F6F9EF" }}>
 
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
            <div className="text-gray-700 font-medium">{buyer.no}</div>
            <div className="text-gray-700 font-medium">{buyer.buyerName}</div>
            <div className="text-gray-700">{buyer.phone}</div>
            <div className="text-gray-700">{buyer.planExpiring}</div>
            <div className="text-gray-700">{buyer.paymentType}</div>
            <div className="text-gray-700">{buyer.type}</div>
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

