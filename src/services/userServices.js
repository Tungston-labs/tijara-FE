import axios from "axios";
const API = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const fetchUser = async (user) => {
  const response = API.get(`/admin/auth/get-all-users?role=${user}`);
  return response;
};

export const fetchAgents = async () => {
  const response = await API.get(`/admin/agent/get-agents`);
  return response;
};

export const fetchItems = async ({page}) => {
    console.log("hello")
    const response = API.get(`product/get-products?page=${page}`)
    return response
}



export const fetchSubItems = async (itemName) => {
  const response = API.get(`product/item-sub-category/${itemName}`);
  console.log(response);
  const datas = await response.json();
  return { data: datas.items, totalPages: datas.totalPages };
};

export const deleteUserById = async (id) => {
  const res = await axios.delete(`/admin/auth/api/users/${id}`);
  return res.data;
};
export const addAgents=async()=>{
    const response=await axios.post(`/admin/agent/add-agent`)
    return response.data;
}
