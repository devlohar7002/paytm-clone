import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/ButtonWarning";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handelsubmit = async () => {
    try {
      setErrorMessage(null);
      const response = await axios.post(
        "http://localhost:3000/app/v1/user/signin",
        {
          username: email,
          password,
        }
      );
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log("Error here: ", error);
      const message = error.response?.data?.data?.message || error.message;
      setErrorMessage(message);
    }
  };
  return (
    <div className="bg-slate-50 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg shadow-xl bg-white w-80 text-center p-4 h-max ">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter details to sign in"} />

          <InputBox
            label={"Email"}
            placeholder={"johndoe@xyz.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"******"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handelsubmit} />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />

          {errorMessage ? <ErrorMessage label={errorMessage} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Signin;
