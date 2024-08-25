/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { LabelAndInput } from "../components/LabelAndInput";
import apiCall from "../services/apiCall";
import { signupAPI } from "../services/constant";
import Toast from "../utils/toaster";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/authAtom";
import { z } from "zod";

// Updated Zod schema for sign-up
const signupSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  username: z.string().min(1, "Username is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    // Step 3: Validate the form data using the Zod schema
    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors = validation.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setError(formattedErrors);
      return;
    }

    try {
      setLoader(true);
      let req = signupAPI;
      req.data = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        password: formData.password,
      };
      const res = await apiCall(req);

      if (res.data.success) {
        console.log(res);
        setLoader(false);
        Toast.successToast({
          message: "Sign up successful",
          autoClose: 300,
          position: "top-center",
        });
        setAuth(true);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        Toast.errorToast({
          message: "Sign up failed",
          autoClose: 300,
          position: "top-center",
        });
      }
    } catch (error) {
      Toast.errorToast({
        message: "Sign up failed",
        autoClose: 300,
        position: "top-center",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")) { 
      setAuth(true);   
      navigate("/dashboard");     
    }
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 border-2 bg-white rounded-sm shadow-xl">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="mt-4">Fill your details to create an account</p>
          </div>

          <LabelAndInput
            text="First Name"
            placeholder="First Name"
            id="firstName"
            onChangeFormData={onChangeFormData}
            formData={formData.firstName}
          />
          {error.firstName && <p className="text-red-500">{error.firstName}</p>}

          <LabelAndInput
            text="Last Name"
            placeholder="Last Name"
            id="lastName"
            onChangeFormData={onChangeFormData}
            formData={formData.lastName}
          />
          {error.lastName && <p className="text-red-500">{error.lastName}</p>}

          <LabelAndInput
            text="Email"
            placeholder="Email"
            id="username"
            onChangeFormData={onChangeFormData}
            formData={formData.username}
          />
          {error.username && <p className="text-red-500">{error.username}</p>}

          <LabelAndInput
            text="Password"
            placeholder="Password"
            id="password"
            onChangeFormData={onChangeFormData}
            formData={formData.password}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}

          <div className="text-center mt-6">
            <Button text="Sign Up" onClick={handleSubmit} loader={loader} />
          </div>

          <p className="mt-4 font-bold">
            Already have an account?{" "}
            <span className="underline cursor-pointer">
              <Link to="/signin">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
