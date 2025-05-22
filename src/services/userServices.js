import axios from "axios";
const API = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// export const fetchUser = async (user) => {
//   const response = API.get(`/admin/auth/get-all-users?role=${user}`);
//   return response;
// };

export const fetchAgents = async ({page, limit}) => {
  const response = await API.get(`/admin/agent/get-agents?page=${page}&limit=${limit}`);
  return response;
};

export const fetchItems = async ({page}) => {
    console.log("hello")
    const response = API.get(`product/get-products?page=${page}`)
    return response
}


export const fetchsellproducts = async ({page}) => {
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
console.log("Selected code is empty");



export const deleteUserById = async (id) => {
  const res = await axios.delete(`/admin/auth/api/users/${id}`);
  return res.data;
};

export const addAgentAPI=async(agentData)=>{
    const response=API.post(`/admin/agent/add-agent`,agentData)
    return response.data;
}

export const editAgentAPI = async (id, editData) => {
  const response = await API.put(`/admin/agent/update-agent/${id}`, editData);
  return response.data;
};

export const fetchUsersAPI = async ({ role, search = "", page = 1, status = "" }) => {
  const response = await API.get(
        `/admin/auth/get-all-users?role=${role}&search=${search}&page=${page}&status=${status}`
      );
  return response.data;
};
