import { useState } from "react";

export default function SellerProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const items = Array(10).fill({
    sellerName: "Ajay kumar",
    itemName: "Apple",
    subCategory: "Kashmir Apples",
    country: "India",
  });

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold font-[Nunito] mb-4">Seller products</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Seller name"
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[300px]"
          />
          <button className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold">
            Search
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-white font-bold font-[Nunito] text-black px-4 py-3 rounded-md border border-gray-200 shadow-sm">
            <div>Seller name</div>
            <div>Item name</div>
            <div>Item sub category</div>
            <div>Country</div>
          </div>

          {/* Table Rows */}
          <div className="mt-4 space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 bg-white px-4 py-3 rounded-md border border-gray-200 text-black shadow-sm"
              >
                <div>{item.sellerName}</div>
                <div>{item.itemName}</div>
                <div>{item.subCategory}</div>
                <div>{item.country}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          {/* Page numbers */}
          <div className="flex items-center space-x-2 text-gray-700">
            <button className="text-xl text-black font-bold">&lt;</button>
            <button className="bg-[#B3DB48] text-black w-8 h-8 rounded-full font-bold font-[Nunito]">
              1
            </button>
            <button className="hover:underline">2</button>
            <button className="hover:underline">3</button>
            <button className="hover:underline">4</button>
            <span className="text-gray-500">....</span>
            <button className="hover:underline">231</button>
            <button className="text-xl text-black font-bold">&gt;</button>
          </div>

          {/* Go to page */}
          <div className="flex items-center gap-2 text-gray-700">
            <span>Go to page</span>
            <input
              type="number"
              placeholder="000"
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
