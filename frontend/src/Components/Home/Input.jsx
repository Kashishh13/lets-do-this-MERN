import axios from "axios";
import React, {  useState } from "react";
import { RxCross1 } from "react-icons/rx";
const Input = ({ input, setInput }) => {
  const [data, setData] = useState({ title: "", desc: "" });
 
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const submitData = async () => {
    if (data.title === "" || data.desc === "") {
      alert("All fields are required");
    }
    await axios.post("http://localhost:1000/api/vi/create-task", data, {
      headers,
    });
    setData({ title: "", desc: "" });
    setInput("hidden");
  };

  return (
    <>
      <div
        className={`${input} fixed top-0 left-0 bg-white opacity-70 h-screen w-full`}
      ></div>
      <div
        className={`${input} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-500  p-4  rounded">
          <div className="flex justify-end">
            <button
              className="text-2xl text-white"
              onClick={() => setInput("hidden")}
            >
              <RxCross1 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="p-3 rounded py-2 my-3  w-full"
            value={data.title}
            onChange={change}
          />
          <textarea
            type="text"
            cols="30"
            rows="10"
            placeholder="Description"
            name="desc"
            className="p-3 rounded py-2 w-full my-3"
            value={data.desc}
            onChange={change}
          />
          <button
            onClick={submitData}
            className="px-3 py-2 bg-purple-300 my-3 text-black w-full hover:bg-white"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
