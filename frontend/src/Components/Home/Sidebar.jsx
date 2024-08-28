
import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.jpg'
import { useDispatch } from 'react-redux';
import { MdIncompleteCircle } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { MdSpeakerNotes } from "react-icons/md";
import { TiTick } from "react-icons/ti"
import { NavLink,useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
 
  const sideData = [
    {
      title: "All Tasks",
      icon: <MdSpeakerNotes />,
      link: '/'
    },
    {
      title: "Important Tasks",
      icon: <FaBookmark />,
      link: '/important-task'
    },
    {
      title: "Incompleted Tasks",
      icon: <MdIncompleteCircle />,
      link: '/incomplete-tasks'
    },
    {
      title: "Completed Tasks",
      icon: <TiTick />,
      link: '/completed-tasks'
    },
  ]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/vi/get-all-tasks", { headers });
        setData(response.data.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []); //
 
  return (
    <>
    <div className='flex flex-col'>
      <div className='mb-4 mt-4'>
        <img src={logo} alt='lets dot it' />
      </div>
      {
  data && (
    <div>
      <div className='text-lg font-semibold text-gray-700 mb-1'>{data.username}</div>
      <div className='text-sm text-gray-500 mb-16'>{data.email}</div>
    </div>
  )
}

     
      <div className='flex flex-col space-y-2 font-bold'>
        {sideData.map((item, i) => (
          <NavLink
            to={item.link}
            key={i}
            className={({ isActive }) =>
              `px-4 py-2 rounded cursor-pointer flex items-center ${isActive ? 'bg-purple-400 text-white' : 'hover:bg-purple-300'}`
            }
          >
            {item.icon}
            <span className='ml-2'>{item.title}</span>
          </NavLink>
        ))}
      </div>
      <button onClick={logout} className='bg-purple-400 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded mt-16'>
        Logout
      </button>
    </div>
    </>
  )
}

export default Sidebar;

