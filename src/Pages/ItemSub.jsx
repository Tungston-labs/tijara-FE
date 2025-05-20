import { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { fetchItemSubList } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ItemNameList() {
  const dispatch = useDispatch();
  const { itemsubList } = useSelector((state) => state.user);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [itemName , setItemName] = useState('');
  const [subcategory , setSubCategory] = useState('');
  const popupRef = useRef(null);
    

const additems = () => {
   const data = {
    itemName : itemName,
    subcategory: subcategory,
   }
   dispatch(fetchItemSubList(data))
   .then ((res) =>{

    if(res.status==201)
    {
      dispatch(fetchItemSubList)
    }
   })
   .catch((err)=>{
    console.log(err);
   })
  // console.log("data")
  }
   

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsFilterOpen(false);
    };
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
  }, []);

const fetchItemSubList = (page) => {
    dispatch(fetchItemSubList({ page }))
      .then((action) => {
        if (action.payload?.data) {
          setItems(action.payload.data);
          setTotalPages(action.payload.totalPages || 231);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const items = Array(10).fill({ subCategory: "item 1", item: "item 1" });

  return (
    <div className="min-h-screen bg-[#E9E9E9] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-600">Category &gt; Item name</p>
            <h2 className="text-2xl font-[Nunito] font-bold text-black mt-1">Sub category</h2>
            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                placeholder="Enter Item name"
                onChange={(e) => {
                setItemName(e.target.value);
                }}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
              />
              <input
                type="text"
                placeholder="Enter Sub category"
                onChange={(e) => {
                setSubCategory(e.target.value);
                }}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none w-[250px]"
              />
              <button className="bg-[#B3DB48] text-black px-6 py-2 rounded-md font-[Nunito] font-bold" onClick={additems}>
                + Add
              </button>
            </div>
          </div>
          
        </div>

        {/* Table */}
        <div className="bg-[#F6F9EF] p-4 rounded-md shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-white px-4 py-3 rounded-md font-[Nunito] font-bold text-black border border-gray-200 shadow-sm">
            <div>Sub Category</div>
            <div>Item</div>
          </div>

          {/* Item Rows */}
          <div className="mt-4 space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 bg-white px-4 py-3 rounded-md border border-gray-200 text-gray-700 shadow-sm"
              >
                <div>{item.subCategory}</div>
                <div>{item.item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <button className="text-lg">&lt;</button>
            <button className="bg-[#B3DB48] text-black w-8 h-8 rounded-full font-[Nunito] font-bold">
              1
            </button>
            <button className="hover:underline">2</button>
            <button className="hover:underline">3</button>
            <button className="hover:underline">4</button>
            <span className="text-gray-500">....</span>
            <button className="hover:underline">231</button>
            <button className="text-lg">&gt;</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
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

