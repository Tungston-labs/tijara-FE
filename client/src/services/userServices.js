import axios from "axios";
const API  = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:5000/admin/auth",
    headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
        
    }

})

export const fetchUser = async (user) => {
    const response = API.get(`get-all-users?role=${user}`)
    return response
}


export const deleteUserById = async (id) => {
  const res = await axios.delete(`/api/users/${id}`);
  return res.data;
};
