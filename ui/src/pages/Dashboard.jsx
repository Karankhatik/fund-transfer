import Navbar from "../components/Navbar"
import Users from "../components/Users"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import apiCall from "../services/apiCall"
import { getUserAPI, getAllUserAPI} from "../services/constant"
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [allUser, setAllUser] = useState([]);
  const [temporaryUsers, setTemporaryUsers] = useState();



    useEffect(() => {
    if(!localStorage.getItem("token")) {   
      navigate("/signin");      
    }
    fetchUser();
    fetchAllUser();

  }, [])

  const fetchUser = async () => {
    let req = getUserAPI;
    const res = await apiCall(req)
    if(res.data.success) {
      setUser(res.data.user);
    }
  }

  const fetchAllUser = async () => {
    let req = getAllUserAPI;
    const res = await apiCall(req)
    if(res.data.success) {
      setAllUser(res.data.users);
      setTemporaryUsers(res.data.users);
    }
  }

 
  let ref = useRef();

  const searchUser = async (value) => {
    let users = temporaryUsers.filter((user) => {
      return user.first_name.toLowerCase().includes(value.toLowerCase());
    });
    setAllUser(users);
    console.log("users");
  };
  
  const onSearchUser = (e) => {
    let value = e.target.value;
    // Clear the previous timeout
    clearTimeout(ref.current);
  
    // Set a new timeout
    ref.current = setTimeout(() => {
      searchUser(value);
    }, 1500);
  };
  
 

  
  return (
    <div>
      <Navbar user={user}/>
      <Users allUser={allUser} onSearchUser={onSearchUser} user={user}/>
    </div>
  )
}

export default Dashboard