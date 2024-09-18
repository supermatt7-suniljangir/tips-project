import api from "../../api/axios";

export const googleAuth = (code)=>api.get(`/api/google?code=${code}`)