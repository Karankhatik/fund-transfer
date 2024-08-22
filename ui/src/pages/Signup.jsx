/* eslint-disable react/prop-types */
import { useState } from "react"
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <>
    <div className="flex justify-center items-center h-screen ">
      <div className="p-6 border-2 bg-white rounded-sm shadow-xl">
        <div className="text-center mb-5">
        <h1 className="text-3xl font-bold" >Sign Up</h1>
        <p className="mt-4">Fill your detail to create an account</p>
        </div>

        <LabelAndInput text="First Name" placeholder="First Name" id="firstName" onChangeFormData={onChangeFormData} formData={formData} />
        <LabelAndInput text="Last Name" placeholder="Last Name" id="lastName" onChangeFormData={onChangeFormData} formData={formData} />
        <LabelAndInput text="Email" placeholder="Email" id="userName" onChangeFormData={onChangeFormData} formData={formData} />
        <LabelAndInput text="Password" placeholder="Password" id="password" onChangeFormData={onChangeFormData} formData={formData} />
        
      </div>
    </div>
    </>
  )
}

const LabelAndInput = ({text, id, onChangeFormData, formData, placeholder}) => {

  return (
    <>
    <label className="mb-2 text-md font-medium" htmlFor={id}>{text}</label> <br/>
    <input placeholder={placeholder} onChange={(e) => onChangeFormData(e)} className="w-full mt-2 border border-gray-300 px-2 py-2 bg-white focus:outline-none " type="text" id={id} value={formData.firstName} />
    </>
  )
  
}

export default Signup

// https://sandboxapi.surveybooker.co.uk/api/auth/auth2callback/calendar?state=%7B%22for%22:%22googleOAuthForSurveyorConnection%22,%22userLoginID%22:466,%22companyID%22:1%7D&code=4/0AQlEd8zjMrjWYGyFXSJwv5YRbTVnjTVvXRD6MM5vxSV9XuDKBO1BtU71gMOdLim8PLDRQw&scope=email%20openid%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/userinfo.email&authuser=0&prompt=consent