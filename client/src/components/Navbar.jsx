import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ()=>{
    const navigate = useNavigate();
    const logOut = (e)=>{
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        localStorage.clear();
        const data = user_id;
        axios.post("http://127.0.0.1:3001/auth/logout",data,{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.error(error);
        });
        navigate("/");
    }
    return(
        <div className="navbar flex relative w-full bg-black text-white justify-center">
            <a href="/home" className="px-2 text-2xl hover:bg-gray-500">Home</a>
            <a href="/event" className="px-2 text-2xl hover:bg-gray-500">Events</a>
            <a href="/task" className="px-2 text-2xl hover:bg-gray-500">Tasks</a>
            <a href="/profile" className="px-2 text-2xl hover:bg-gray-500">Profile</a>
            <h1 onClick={logOut} className="px-2 text-2xl hover:bg-gray-500">Logout</h1>
        </div>
    );
}

export default Navbar;