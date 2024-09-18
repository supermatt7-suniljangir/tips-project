
import axios from 'axios';

 const api = axios.create({
    baseURL:'https://nrrqsiyft0.execute-api.eu-north-1.amazonaws.com/dev'
})

export default api;