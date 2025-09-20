import { Search } from "lucide-react";
import { setInputValue, setSearch } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export default function Topbar() {
 const dispatch = useDispatch();

  const { inputValue } = useSelector((state) => state.user);
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearch(inputValue));
    }, 1000); 

    return () => clearTimeout(delayDebounce); 
  }, [inputValue, dispatch]);
  const handleInputChange = (e) => {
      dispatch(setInputValue(e.target.value));
      
  };
  
  return (
    <div className="flex bg-[#E9E9E9] px-6 py-2 pt-8">

      <div className="relative flex-1  rounded-2xl max-w-xl flex justify-center">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          value={inputValue}
          placeholder="Search here"
          className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
          onChange={handleInputChange
          }
          
        />
      </div>
    </div>
  );
}

