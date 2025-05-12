export default function ConfirmationBox() {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <div className="bg-white p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] w-[400px] text-center">
          <p className="text-lg ont-[Nunito] font-bold text-black">
            Are you sure you want to activate this{" "}
            <span className="text-[#B3DB48] font-bold">subscription</span>?
          </p>
          
          <div className="flex justify-center gap-6 mt-6">
            {/* Cancel Button */}
            <button className="flex items-center gap-2 bg-red-300 text-red-800 px-6 py-2 rounded-xl text-lg font-medium hover:bg-red-400 transition">
              ❌ Cancel
            </button>
  
            {/* Activate Button */}
            <button className="flex items-center gap-2 bg-[#B3DB48] text-white px-6 py-2 rounded-xl text-lg font-medium hover:bg-green-500 transition">
              ✅ Activate
            </button>
          </div>
        </div>
      </div>
    );
  }
  