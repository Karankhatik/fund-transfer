
import axios from "axios";


const getAuthToken = () => {
    return localStorage.getItem("token");
}

const apiCall = async (request) => {
    request.headers = {
        "Authorization": `Bearer ${getAuthToken()}`
    }
   const result = await axios(request);
   return result;
}

export default apiCall