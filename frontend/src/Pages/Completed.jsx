import React ,{useEffect, useState}from 'react'
import Cards from '../Components/Home/Cards'
import axios from 'axios';
const Completed = () => {
  
    const[data,setData] =useState()
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:1000/api/vi/get-complete-tasks",
            { headers }
          );
          setData(response.data.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      fetchData();
    });
    return (
  
      <div>     <Cards home={"false"} data={data}/></div>
    )
  
}

export default Completed