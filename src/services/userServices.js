// src/services/userServices.js
import { axiosPrivate } from "../api/api";

// Use axiosPrivate directly (do NOT call .create() on it)

export const fetchApproveBuyerList = async (buyer) => {
  const response = await axiosPrivate.get(`/admin/auth/unapproved-users=${buyer}`);
  return response.data;
};
export const fetchAgents = async ({ page = 1, search = "" } = {}) => {
  const res = await axiosPrivate.get(`/admin/agent/get-agents?page=${page}&search=${encodeURIComponent(search)}`);

  const data = res.data || {};
  return {
    agents: data.agents || [],
    page: data.page ?? 1,
    pageSize: data.pageSize ?? (data.pagination?.pageSize ?? 0),
    total: data.total ?? (data.pagination?.total ?? 0),
    totalPages: data.totalPages ?? (data.pagination?.pages ?? 1),
  };
};
export const fetchUnapprovedUsers = async ({ page = 1, search = "" }) => {
  const response = await axiosPrivate.get(`/admin/auth/unapproved-users?page=${page}&search=${encodeURIComponent(search)}`);
  return response.data;
};

export const fetchItems = async ({ page = 1 }) => {
  const response = await axiosPrivate.get(`/product/get-products?page=${page}`);
  return response.data;
};

export const fetchSubItems = async (page = 1, search = "") => {
  const response = await axiosPrivate.get(`/items/get-subcategories?page=${page}&search=${encodeURIComponent(search)}`);
  return {
    data: response.data.subCategories,
    pagination: response.data.pagination,
  };
};

export const fetchProducts = async ({ page = 1, role = "" }) => {
  const response = await axiosPrivate.get(`/product/get-products/${encodeURIComponent(role)}?page=${page}`);
  return response.data;
};

export const deleteUserById = async ({ role, id }) => {
  const res = await axiosPrivate.delete(`/admin/auth/delete-user/${role}/${id}`);
  return res.data;
};

export const deleteAgentById = async (id) => {
  const res = await axiosPrivate.delete(`/admin/agent/delete-agent/${id}`);
  return res.data;
};

export const addAgentAPI = async (agentData) => {
  const response = await axiosPrivate.post(`/admin/agent/add-agent`, agentData);
  return response.data;
};

export const editAgentAPI = async (id, editData) => {
  const response = await axiosPrivate.put(`/admin/agent/update-agent/${id}`, editData);
  return response.data;
};

export const fetchUsersAPI = async ({ role, search = "", page = 1, status = "" }) => {
  const response = await axiosPrivate.get(`/admin/auth/get-all-users?role=${encodeURIComponent(role)}&search=${encodeURIComponent(search)}&page=${page}&status=${encodeURIComponent(status)}`);
  return response.data;
};

export const fetchPendingUsersAPI = async ({ role, search = "", page = 1, status = "" }) => {
  const response = await axiosPrivate.get(`/admin/auth/unapproved-users?role=${encodeURIComponent(role)}&search=${encodeURIComponent(search)}&page=${page}&status=${encodeURIComponent(status)}`);
  return response.data;
};

export const approveUsersAPI = async ({ userId, status }) => {
  const response = await axiosPrivate.post(`/admin/auth/verify-user`, { userId, status });
  return response.data;
};

export const pendingTradeLicense = async ({ page = 1, search = "" }) => {
  const response = await axiosPrivate.get(`/admin/auth/pending-license?page=${page}&search=${encodeURIComponent(search)}`);
  return response.data;
};

export const approveLicense = async (userId, action) => {
  const response = await axiosPrivate.put(`/admin/auth/verify-trade-license/${userId}`, { action });
  return response.data;
};

export const editUserAPI = async (role, id, editData) => {
  const response = await axiosPrivate.put(`/admin/auth/edit-user/${role}/${id}`, editData);
  return response.data;
};

export const fetchUserByIdAPI = async ({ id }) => {
  const response = await axiosPrivate.get(`/admin/auth/get-user/${id}`);
  return response.data;
};

export const getSubscriptionHistory = async (userId) => {
  const response = await axiosPrivate.get(`/subscription/history/${userId}`);
  return response.data;
};

export const addSubCategoryAPI = async ({ name, itemNameId }) => {
  const response = await axiosPrivate.post("/items/add-subcategory", { name, itemNameId });
  return response.data;
};

export const addItemAPI = async ({ name, category }) => {
  const response = await axiosPrivate.post("/items/add-name", { name, category });
  return response.data;
};

export const getItemNamesAPI = async (page = 1, search = "") => {
  const response = await axiosPrivate.get(`/items/get-names?page=${page}&search=${encodeURIComponent(search)}`);
  return response.data;
};
