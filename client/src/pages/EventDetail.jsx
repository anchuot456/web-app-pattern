import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EventDetail = ()=>{

    const [event,setEvent] = useState('');
    const [userName,setUserName] = useState('');
    const [participant,setParticipant] = useState([]);

    const {event_id} = useParams();

    const navigate = useNavigate();

    const getEventById = async ()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        await axios.get("http://127.0.0.1:3001/event/id",{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            },
            params:{
                event_id,
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.accessToken){
                console.log(response.data.accessToken);
                localStorage.setItem("accessToken",response.data.accessToken);
                getEventById();
            }else{
                console.log(response.data);
                setEvent(response.data);
                setUserName(response.data.responsible.name);
                setParticipant(response.data.participant);
                console.log(event);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }

    let participantName = '';
    const createParticipantName = ()=>{
        participant.map(async(person)=>{
            console.log(person);
            participantName += person.name+",";    
        });
        
        participantName = participantName.substring(0,participantName.length-1);
        return participantName;
    }
    useEffect(()=>{
        getEventById();
    },[]);
    const createTaskUrl = "/task/create/"+event_id;
    console.log(createTaskUrl);

    const deleteEventHandler = async(e)=>{
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const data = {event_id};
        await axios.post("http://127.0.0.1:3001/event/delete",data,{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            },
            params:{
                event_id,
            }
        }).then((response)=>{
            console.log(response);
            navigate("/home");
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });

    }
    return(
        <div className="eventDetail">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="bg-white">
                    <div className="text-2xl justify-center flex">
                        <b>Event Detail</b>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Event Name:</b>
                        <h1>{event.name}</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Event Date:</b>
                        <h1>{event.date}</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Location:</b>
                        <h1>{event.location}</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Description:</b>
                        <h1>{event.description}</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Event Responsible:</b>
                        <h1>{userName}</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Participants:</b>
                        <h1>{createParticipantName()}</h1>
                    </div>
                    <div className="bg-white justify-between my-4 text-2xl px-4">
                        <a href={createTaskUrl} className="bg-blue-200 text-2xl rounded px-1 mr-2">Create Task</a>
                        <h1 className="bg-blue-200 text-2xl rounded px-1 mr-2">Edit Event</h1>
                        <h1 className="bg-blue-200 text-2xl rounded px-1 mr-2" onClick={deleteEventHandler}>Delete Event</h1>
                    </div>
                </div>
                
            </div>
        </div>
    );

}
export default EventDetail;