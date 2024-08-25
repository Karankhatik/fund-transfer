/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../components/Buttons";
import { Link } from "react-router-dom";
import { LabelAndInput } from "../components/LabelAndInput";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import apiCall from "../services/apiCall";
import { signinAPI } from "../services/constant";
import Toast from "../utils/toaster";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/authAtom";


// Updated Zod schema
const signinSchema = z.object({
  username: z.string().min(1, "Username is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authAtom);

  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async () => {
    // Step 3: Validate the form data using the Zod schema
    const validation = signinSchema.safeParse(formData);

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
      let req = signinAPI;
      req.data = formData;
      const res = await apiCall(req);

      if (res.data.success) {
        console.log(res);
        setLoader(false);
        Toast.successToast({
          message: "Sign in successfully",
          autoClose: 300,
          position: "top-center",
        });
        setAuth(true);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        Toast.errorToast({
          message: "Sign in failed",
          autoClose: 300,
          position: "top-center",
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Toast.errorToast({
        message: "Sign in failed",
        autoClose: 300,
        position: "top-center",
      });
      // do nothing
    } finally {
      setLoader(false);
    }
  };

  
  

  return (
    <>
      <div className="flex justify-center items-center h-screen ">
        <div className="p-6 border-2  bg-white rounded-sm shadow-xl">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="mt-4">
              Enter your credentials to access your account
            </p>
          </div>

          <LabelAndInput
            text="Email"
            placeholder="Email"
            id="username"
            onChangeFormData={onChangeFormData}
            formData={formData}
          />
          {error.username && <p className="text-red-500">{error.username}</p>}
          <LabelAndInput
            text="Password"
            placeholder="Password"
            id="password"
            onChangeFormData={onChangeFormData}
            formData={formData}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
          <div className="text-center mt-6">
            <Button
              text="Sign In"
              onClick={() => handleSubmit()}
              loader={loader}
            />
          </div>

          <p className="mt-4 font-bold">
            Don&apos;t have an account?{" "}
            <span className="underline cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
