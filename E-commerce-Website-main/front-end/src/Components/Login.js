import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Login =  () => {

    const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

//code for not directing through link on webpage (/signup or /login)
  useEffect(()=>{
    const auth = localStorage.getItem('user');
     if(auth){
      navigate('/')
     }
  },[])

  const handleLogin = async ()=>{
    console.log(email,password)
    let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({email, password }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json()
      console.log(result);
      if(result.name){
        localStorage.setItem("user",JSON.stringify(result))
        navigate('/');
      }else{
        alert('Please enter correct email or password');
      }
        
       
     
  }


  return (
    <div className="register">
      <h3>Login Page</h3>
      <input className="inputBox" type="text"  value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Password"
      />

      <button className="appButton" onClick={handleLogin} type="button">
        LoginIn
      </button>
    </div>
  );
};

export default Login;
