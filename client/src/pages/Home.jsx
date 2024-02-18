import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ()=>{
    const [userName,setUserName] = useState('');
    const [event, setEvent] = useState([]);
    const [task,setTask]=useState([]);
    const navigate = useNavigate();

    const getUser = async ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        await axios.get("http://127.0.0.1:3001/user",{
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

    const getEvent = async ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        await axios.get("http://127.0.0.1:3001/event",{
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
                getEvent();
            }else{
                console.log(response.data);
                setEvent(response.data);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }

    const getTask = async ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        await axios.get("http://127.0.0.1:3001/task",{
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
    useEffect((e)=>{
        getUser();
        getEvent();
        getTask();
    },[]);

    const displayEvent = event.map((e)=>{
        const url = "/event/detail/"+e._id;
        return(
            <div>
                <a href={url} className="text-2xl px-4">Event {event.indexOf(e) + 1}: {e.name}</a>
                <br/>
            </div>
            
        );
    });

    const displayTask = task.map((t)=>{
        const url = "/task/detail/"+t._id;
        return(
            <div>
                <a href={url} className="text-2xl mx-4 bg-slate-200">Task {task.indexOf(t)+1}: {t.title}</a>
                <br/>
            </div>
            
        );
    })
    return(
        <div className="home">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="text-2xl justify-between flex">
                    <h1>Hello, {userName}</h1>
                    <a href="/event/create" className="bg-blue-400 text-xl text-white px-4 rounded hover:bg-blue-200">Create New Event</a>
                </div>
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4 w-full">Upcoming Events</b>
                    <br/>
                    {displayEvent}
                </div>
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4">Your Tasks</b>
                    <br/>
                    {displayTask}
                </div>
            </div>
        </div>
    );
}

export default Home;