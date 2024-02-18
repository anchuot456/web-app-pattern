import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Event = ()=>{

    const [event,setEvent] = useState([]);

    const navigate = useNavigate();

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

    useEffect(()=>{
        getEvent();
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

    return(
        <div className="event ">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="bg-white text-start my-4">
                    <b className="text-2xl px-4 w-full">Upcoming Events</b>
                    <br/>
                    {displayEvent}
                </div>
            </div>
        </div>
    );
}

export default Event;