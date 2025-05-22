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

export const fetchApproveBuyerList = async (buyer) => {
  const response = API.get(`/admin/auth/unapproved-users=${buyer}`);
  return response;
};

export const fetchAgents = async ({page}) => {
  const response = await API.get(`/admin/agent/get-agents?page=${page}`);
  return response;
};
export const fetchUnapprovedUsers = async ({page}) => {
  const response = await API.get(`admin/auth/unapproved-users?page=${page}`);
  return response;
};

export const fetchItems = async ({page}) => {
    console.log("hello")
    const response = API.get(`product/get-products?page=${page}`)
    return response
}


export const fetchSubItems = async (page = 1, search = "") => {
  const response = await API.get(`/items/get-subcategories?page=${page}&search=${search}`);
  return {
    data: response.data.items, // adjust based on actual response
    totalPages: response.data.totalPages,
  };
};


export const fetchProducts = async ({page}) => {
    console.log("hello")
    const response = API.get(`/product/get-products`)
    return response
}

export const deleteUserById = async (id) => {
  const res = await axios.delete(`/admin/auth/api/users/${id}`);
  return res.data;
};
export const addAgents=async(agentData)=>{
    const response=await axios.post(`/admin/agent/add-agent`,agentData)
    return response.data;
}
