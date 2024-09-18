import api from "../../api/axios";

export const googleAuth = (code)=>api.get(`/api/auth/google?code=${code}`)