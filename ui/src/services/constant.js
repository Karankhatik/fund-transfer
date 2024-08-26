
const baseURL = "https://fund-transfer-backend.vercel.app/api/v1";
export const signupAPI = {
    url: `${baseURL}/user/signup`,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export const signinAPI = {
    url: `${baseURL}/user/login`,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export const getUserAPI = {
    url: `${baseURL}/user/getUser`,
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}


export const getAllUserAPI = {
    url: `${baseURL}/user/getAllUser`,
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}

export const checkBalanceAPI = {
    url: `${baseURL}/account/chekBalance`,
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}

export const transferBalanceAPI = {
    url: `${baseURL}/account/transferBalance`,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export const logoutAPI = {
    url: `${baseURL}/user/logout`,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}