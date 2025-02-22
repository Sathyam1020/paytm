import React, {useState} from 'react'
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from "axios";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const Signin = () => {

  const [username, setUsername] =  useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Signed in successfully");
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-sm'>
          <Heading label={"Sign in"}/> 
          <SubHeading label={"Enter your credentials to access your account"} /> 
          <InputBox
              onChange={e => {
                setUsername(e.target.value);
              }}
              placeholder="sathyam@gmail.com"
              label={"Email"}
          />
          <InputBox
              onChange={e => {
                setPassword(e.target.value);
              }}
              placeholder="PaSsword@78"
              label={"Password"}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={onClick}/>
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Signin; 