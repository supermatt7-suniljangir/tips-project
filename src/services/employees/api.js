import api from "../../api/axios.js";

export const getEmployees = async ()=>{
const res = await api.get('/api');
return res.data;
}
