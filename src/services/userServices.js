import axios from "axios";
const API  = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:5000/admin",
    headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        
    }

})


export const fetchUser = async (user) => {
    const response = API.get(`/auth/get-all-users?role=${user}`)
    return response
}

export const fetchAgents = async () => {
    const response = API.get(`/agent`)
    return response
}


export const deleteUserById = async (id) => {
  const res = await axios.delete(`/auth/api/users/${id}`);
  return res.data;
};
