// import { type } from "@testing-library/user-event/dist/type";
import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
     if(auth){
      navigate('/');
     }
  },[])


  const collectData = async () => {
    // console.log(name,email,password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json()
    console.log(result);
      localStorage.setItem("user",JSON.stringify(result))
      navigate('/')
   
  };

  return (
    <div className="register">
      <h3>Registeration Page</h3>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Name"
      />

      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Password"
      />

      <button className="appButton" onClick={collectData} type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
