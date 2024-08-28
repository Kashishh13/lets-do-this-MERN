import React, { useState, useEffect } from "react";
import Cards from "../Components/Home/Cards";
import { IoMdAddCircle } from "react-icons/io";
import Input from "../Components/Home/Input";
import axios from "axios";
const All = () => {
  const [data, setData] = useState([]);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/vi/get-all-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  });
  const [input, setInput] = useState("hidden");
  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <IoMdAddCircle
            onClick={() => setInput("fixed")}
            className=" text-4xl cursor-pointer text-black hover:text-white"
          />
        </div>
        {data && (
          <Cards
            home={"true"}
            input={input}
            setInput={setInput}
            data={data.tasks}
           
          />
        )}
      </div>
      <Input input={input} setInput={setInput} />
    </>
  );
};

export default All;
