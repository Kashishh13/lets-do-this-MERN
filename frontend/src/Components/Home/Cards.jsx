import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, input, setInput, data, setUpdate }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Fixed string interpolation
  };

  const handleTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/vi/update-complete-task/${id}`, // Fixed template literals
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating task:", error.message); // Added error logging
    }
  };

  const handleImp = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/vi/update-important-task/${id}`, // Fixed template literals
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error updating importance:", error.message); // Added error logging
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/vi/delete-task/${id}`, // Fixed template literals
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data &&
        data.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.desc}</p>
           
            <div className="flex items-center space-x-2">
             
              <button
                onClick={() => handleTask(item._id)}
                className={`${
                  item.complete ? "bg-green-300 hover:bg-green-400" : "bg-red-300 hover:bg-red-400"
                } flex-1 px-4 py-2 mr-8 text-black rounded transition-colors duration-300 text-sm`}
              >
                {item.complete ? "Completed" : "Incomplete"}
              </button>
              
              {/* Container for Bookmark and Delete buttons */}
              <div className="flex space-x-1 "> {/* Adjust space-x-2 for closer buttons */}
               
                <button
                  onClick={() => handleImp(item._id)}
                  className="px-3 py-2 font-extrabold text-black rounded hover:text-purple-500 transition-colors duration-300 text-xl flex justify-center items-center"
                >
                  {item.important ? (
                    <FaBookmark className="text-red-300" />
                  ) : (
                    <FaRegBookmark className="text-gray-600" />
                  )}
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(item._id)}
                  className="px-3 py-2 text-black rounded transition-colors duration-300 text-xl flex justify-center items-center"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <div className="bg-white shadow-lg rounded-lg p-6 flex justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
          <IoMdAddCircle
            className="text-5xl text-purple-300 hover:text-purple-400"
            onClick={() => setInput("fixed")}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
