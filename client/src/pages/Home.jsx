import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ()=>{
    const [userName,setUserName] = useState('');
    const navigate = useNavigate();

    const getUser = ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        axios.get("http://127.0.0.1:3001/user",{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            },
            params:{
                user_id,
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.accessToken){
                console.log(response.data.accessToken);
                localStorage.setItem("accessToken",response.data.accessToken);
                getUser();
            }else{
                setUserName(response.data.name);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }
    useEffect((e)=>{
        getUser();
    },[]);
    return(
        <div className="home">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="text-2xl justify-between flex">
                    <h1>Hello, {userName}</h1>
                    <a href="/" className="bg-blue-400 text-xl text-white px-4 rounded hover:bg-blue-200">Create New Event</a>
                </div>
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4">Upcoming Event</b>
                </div>
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4">Your Task</b>
                </div>
            </div>
        </div>
    );
}

export default Home;