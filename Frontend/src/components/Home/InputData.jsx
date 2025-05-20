import React, { useState , useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';  

const InputData = ({ InputDiv, setInputDiv, UpdatedData , setUpdatedData}) => {
  
  const [Data, setData] = useState({title:"",description:""});
  useEffect(() => {
   setData({title:UpdatedData.title, description:UpdatedData.description })
  }, [UpdatedData])
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name , value } = e.target;
    setData({...Data,[name]:value});
  };
  const submitData = async () => {
    if (!Data.title || !Data.description) {
      alert("All fields are required");
      return;
    } else {
        await axios.post("http://localhost:1000/api/v2/createtask" , Data, {headers});
    
    setData({title:"",description:""});
    setInputDiv("hidden");
  }};

  const UpdateTask = async () => {if (Data.title === "" || Data.description === "" ){
    alert("all fields are required");
  } else {
    await axios.put(`http://localhost:1000/api/v2/updatetask/${UpdatedData.id}`, Data, { headers });

      setUpdatedData({ id: "", title: "", description: "", });
      setData({title:"",description:""});
      setInputDiv("hidden");
}};

  return (
    <>
        <div className={` ${InputDiv} top-0 left-0 bg-gray-700 opacity-50 h-screen w-full `}></div>
        <div className={` ${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 bg-gray-900 p-4 rounded'>
        <div className='flex justify-end'>
          <button className='text-2xl text-white-100 hover:text-red-500 transition-all duration-300' onClick={() => {
          setInputDiv("hidden");
          setData({ title: "", description: "",});
          setUpdatedData({ id: "", title: "", description: "", });
        }}
        ><RxCross2 /></button></div>
        <input type='text' placeholder='Title' name='title' className='px-3 py-2 rounded w-full bg-gray-700 my-3' value={Data.title} onChange={change} />
        <textarea name="description" cols="30" rows="10" placeholder='description...' className='px-3 py-2 rounded w-full bg-gray-700 my-3' value={Data.description} onChange={change}></textarea>
        {UpdatedData.id === "" ?
        (<button className='px-3 py-2 rounded  bg-green-500 text-black text-xl font-semibold' onClick={submitData}>Save</button>) :
        (<button className='px-3 py-2 rounded  bg-green-500 text-black text-xl font-semibold' onClick={UpdateTask}>Update</button>)}
        </div>
        </div>
    </>
  )
}

export default InputData