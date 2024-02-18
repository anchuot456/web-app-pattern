import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Task = ()=>{
    const [task,setTask]=useState([]);
    const navigate = useNavigate();

    const getTask = async ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        await axios.get("http://127.0.0.1:3001/task/all",{
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
                getTask();
            }else{
                console.log(response.data);
                setTask(response.data);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }

    useEffect(()=>{
        getTask();
    },[]);
    const displayTask = task.map((t)=>{
        const url = "/task/detail/"+t._id;
        return(
            <div>
                <a href={url} className="text-2xl mx-4 ">Task {task.indexOf(t)+1}: {t.title}</a>
                <br/>
            </div>
        );
    })
    return(
        <div className="task">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4 w-full">Task List</b>
                    <br/>
                    {displayTask}
                </div>
            </div>
        </div>
    );
}
export default Task;