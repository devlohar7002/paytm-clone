import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/ButtonWarning";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handelsubmit = async () => {
    try {
      setErrorMessage(null);
      const response = await axios.post(
        "http://localhost:3000/app/v1/user/signup",
        {
          username: email,
          firstName,
          lastName,
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
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter details to sign up"} />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            <Button label={"Sign up"} onClick={handelsubmit} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />

          {errorMessage ? <ErrorMessage label={errorMessage} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Signup;
