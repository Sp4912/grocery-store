import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData}) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/updatecompletetask/${taskId}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportantTask = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/updateimptask/${taskId}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/deletetask/${taskId}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask =  (taskId,title,description) => {
    setInputDiv("fixed")
    setUpdatedData({taskId:taskId,title:title, description:description});
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div key={items._id} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
            <h2 className="text-lg font-semibold">{items.title}</h2>
            <p className="text-gray-300 my-2">{items.description}</p>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-500" : "bg-green-500"
                } text-white p-2 w-3/6 rounded`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>

              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important === true ? (<CiHeart />) : (<FaHeart className="text-red-500" />)}
                </button>
                <button onClick={() => handleUpdateTask(items._id, items.title, items.description)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
