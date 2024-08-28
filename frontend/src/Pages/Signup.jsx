import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Signup = () => {
 
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
     if(isLoggedIn===true){
      navigate("/")
        }
  },[])
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are necessary");
      }
      const response = await axios.post("http://localhost:1000/api/vi/sign-in", data); 
      setData({ username: "", email: "", password: "" })
      alert(response.data.message)
     navigate("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during sign-up.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full my-28 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            name="username"
            required
            value={data.username}
            onChange={change}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            value={data.email}
            onChange={change}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            value={data.password}
            onChange={change}
          />
          <button
            onClick={submit}
            className="w-full px-4 py-2 text-black bg-purple-300 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300">
            Sign Up
          </button>
          <p className="text-center text-gray-600">Already have an account?{' '}<Link to='/login' className="text-blue-500 hover:underline">Login</Link> Here</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
