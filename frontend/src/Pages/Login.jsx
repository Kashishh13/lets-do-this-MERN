import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth.js';
import { useSelector } from 'react-redux';
const Login = () => {
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  useEffect(()=>{
     if(isLoggedIn===true){
      navigate("/")
        }
  },[])
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are necessary");
        return;
      }
      
      const response = await axios.post("http://localhost:1000/api/vi/login", data);
      setData({ username: "", password: "" });
   
      
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      
      dispatch(authActions.login(response.data.token));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full my-28 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
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
            className="w-full px-4 py-2 text-white bg-purple-400 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            New User?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>{' '}
            Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
