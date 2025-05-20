import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
const Login = () => {
  const [Data, setData] = useState({username:"",password:""});
  const history = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name , value } = e.target;
    setData({...Data,[name]:value});
  };
  const submit = async () => {
    try {
    if (Data.username === "" || Data.password === "") {
      alert("All the fields are Required");
  } else {
    const response = await axios.post("http://localhost:1000/api/v1/login", Data);
    setData({username:"",password:""});
    localStorage.setItem("id",response.data.id);
    localStorage.setItem("token",response.data.token);
    dispatch(authActions.login());
    history("/");
  }
  } catch (error) {
    console.log(error.response.data.message);
  }
};
  return (
    <div className='bg-blue-600 h-[98vh] flex items-center justify-center'>
    <div className='p-4 bg-gray-900 w-2/6'>
    <div className='text-2xl font-semibold'>Login</div>
    <input type='username' placeholder='username' className='bg-gray-700 px-3 py-2 rounded my-3 w-full' name='username' value={Data.username} onChange={change} />
    <input type='password' placeholder='password' className='bg-gray-700 px-3 py-2 rounded my-3 w-full' name='password' value={Data.password} onChange={change} />  
    <div className='w-full flex items-center justify-between'>
    <button className='px-3 py-2 rounded bg-green-500 text-black text-xl font-semibold' onClick={submit}>Login</button>
    <Link to="/signup" className='text-gray-400 hover:text-gray-200'>Not Having An Account? Signup Here</Link>
    </div>
    </div>
</div>
  )
}

export default Login