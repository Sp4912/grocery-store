import React, { useState, useEffect } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const dispatch = useDispatch();
    const history  = useNavigate();
    const data = [
        {
            title:"All Tasks",
            icon:<CgNotes />,
            link:"/",
        },
        {
            title:"Important Tasks",
            icon:<MdLabelImportantOutline />,
            link:"/importanttasks",
        },
        {
            title:"Completed Tasks",
            icon:<FaCheckDouble />,
            link:"/completedtasks",
        },
        {
            title:"Incompleted Tasks",
            icon:<TbNotebookOff />,
            link:"/incompletedtasks",
        },

    ];
    const [Data, setData] = useState();
    const logout = () =>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history ("/signup");
    };
    const headers = {
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get ("http://localhost:1000/api/v2/getalltasks" , {headers});
        setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
    }
    });

  return (
    <>
    {/* {Data && ( */}
    {(
        <div>
            <h2 className='text-xl font-semibold'>Soham Pawar</h2>
            {/* {Data.username} */}
            <h4 className='my-1 text-gray-400'>sohampawar@gamil.com</h4>
            {/* {Data.email} */}
            <hr />
        </div>
)}
        <div>
            {data.map((items, i)=>(
                <Link  to ={items.link} key={i} className='my-2 flex items-center gap-2 hover:bg-gray-600 p-2 rounded transition-all duration-300'>
                    {items.icon}{items.title}
                </Link>
            )
            )}
        </div>
        <div >
            <button className='bg-gray-600 w-full p-2 rounded' onClick={logout}>
                Log Out
            </button>
        </div>
        </>
  )
}

export default Sidebar