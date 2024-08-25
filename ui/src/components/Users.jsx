/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { transferBalanceAPI, checkBalanceAPI } from "../services/constant";
import apiCall from "../services/apiCall";
import Toast from "../utils/toaster";
// eslint-disable-next-line react/prop-types
const Users = ({ allUser, onSearchUser, user }) => {
  const [currentUserForTransfer, setCurrentUserForTransfer] = useState(null);
  const [amount, setAmount] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);        
  const [userBalance, setUserBalance] = useState();

  const handleTransfer = async () => {
    try {
      setLoading(true);                                                                         
      let req = transferBalanceAPI;
      req.data = {
        to: currentUserForTransfer._id,
        amount: amount,
      };
      let res = await apiCall(req);

      if (res.data.success) {
        setCurrentUserForTransfer(null);
        setAmount("");        
        Toast.successToast({
          message: res.data.message,
          autoClose: 300,
          position: "top-center",
        });
        fetchBalance();
        setModal(false); // Close the modal after transfer
      }      
    } catch (error) {       
      Toast.errorToast({
        message: error.response.data.message,
        autoClose: 300,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [])

  const fetchBalance = async () => {
    let req = checkBalanceAPI;
    const res = await apiCall(req)
    if(res.data.success) {
      setUserBalance(res.data.balance);
    }
  }

  const closeModal = () => {
    setModal(false);
    setAmount(""); // Reset the amount field
    setCurrentUserForTransfer(null);
  };

  return (
    <>
    <h1 className="text-2xl mt-4 font-bold pl-8">Your balance is {parseInt(userBalance)}</h1>
  
    <div className="p-8">
      <div className="z-0">
        <h1 className="text-2xl font-bold">Users</h1>
        <input
          placeholder="Search"
          className="w-full mt-2 border-2 border-gray-300 px-2 py-2 bg-white focus:outline-none rounded-md"
          type="text"
          onChange={(e) => onSearchUser(e)}
        />
        <div className="p-2 border border-gray-200 my-2">
          {allUser?.map((user) => 
          {
            return(
            <div
              className="flex justify-between items-center mt-4"
              key={user._id}
            >
              <p>{user.first_name}</p>
              <button
              disabled={loading}                
                onClick={() => {
                  setCurrentUserForTransfer(user);
                  setModal(true);
                }}
                className="bg-black text-white px-2 py-1 rounded"
              >
                Send money
              </button>
            </div>
          )}
          )}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 mb-24 w-[500px] rounded-md shadow-md w-100">
            <h2 className="text-xl font-bold mb-4">
              Send Money to {currentUserForTransfer.first_name}
            </h2>
            <input              
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 text-white bg-red-600 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Users;
