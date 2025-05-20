import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector  } from 'react-redux';
import axios from 'axios';


const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(!isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({username:"",email:"",password:""});
  
  const change = (e) => {
    const { name , value } = e.target;
    setData({...Data,[name]:value});
  };
  const submit = async () => {
    try {
    if (Data.username === "" || Data.email === "" || Data.password === "") {
      alert("All the fields are Required");
  } else {
    const response = await axios.post("http://localhost:1000/api/v1/signup", Data);
    setData({username:"",email:"",password:""});
    alert(response.data.message);
    history("/login");
  }
  } catch (error) {
    alert(error.response.data.message);
  }
};
  return (
    <div className='bg-blue-600 h-[98vh] flex items-center justify-center'>
        <div className='p-4 bg-gray-900 w-2/6'>
        <div className='text-2xl font-semibold'>Signup</div>
        <input type='username' placeholder='username' className='bg-gray-700 px-3 py-2 rounded my-3 w-full' name='username' value={Data.username} onChange={change} />
        <input type='email' placeholder='email' className='bg-gray-700 px-3 py-2 rounded my-3 w-full' name='email' value={Data.email} onChange={change} />
        <input type='password' placeholder='password' className='bg-gray-700 px-3 py-2 rounded my-3 w-full' name='password' value={Data.password} onChange={change} />  
        <div className='w-full flex items-center justify-between'>
    <button className='px-3 py-2 rounded bg-green-500 text-black text-xl font-semibold' onClick={submit} >Signup</button>
    <Link to="/login" className='text-gray-400 hover:text-gray-200'>Already Having An Account? Login Here</Link>
    </div>
        </div>
    </div>
  )
}

export default Signup;