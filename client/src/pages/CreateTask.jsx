import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateTask = ()=>{
    const [title,setTitle]= useState('');
    const [description,setDescription] = useState('');
    const [deadline,setDeadline] = useState('');
    const [assignee,setAssignee]=useState('');
    const [ event,setEvent]=useState('');

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
                console.log(event);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }
    useEffect(()=>{
        getEventById();
    },[]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data ={
            event:event_id,
            title,
            description,
            status: "On going",
            deadline,
            assignee
        };

        console.log(data);
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        await axios.post("http://127.0.0.1:3001/task/create",data,{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            },
            params:{
                event_id,
            }
        }).then((response)=>{
            console.log(response.data);
            navigate("/home");
        }).catch((error)=>{
            console.error(error);
        })
    }
    return(
        <div className="createEvent">
            <Navbar/>
            <div className="bg-slate-100 text-center text-2xl">
                <div className="py-4 text-2xl bg-slate-100 text-center w-full">
                    <b>Create New Event</b>
                </div>
                    <form onSubmit={handleSubmit} className="mx-2 my-2 px-2 py-2 relative">
                        <div className="mb-4 text-start">
                            <div className="mb-4">
                                <h1>Related Event:</h1>
                                <input
                                    type="text"
                                    id="Name"
                                    placeholder="Name"
                                    value={event.name}
                                    className="rounded-md w-60 border-2 border-gray-300 p-2" />
                            </div>

                            <div className="mb-4">
                                <h1>Task Title:</h1>
                                <input
                                    type="text"
                                    id="Title"
                                    placeholder="Title"
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="rounded-md w-60 border-2 border-gray-300 p-2" />
                            </div>
    
                            <div className="mb-4">
                                <h1>Task Description:</h1>
                                <input
                                    type="text"
                                    id="Description"
                                    placeholder="Description"
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="rounded-md w-60 border-2 border-gray-300 p-2" />
                            </div>
    
                            
                            <div className="mb-4">
                                <h1>Deadline:</h1>
                                <input
                                    type="date"
                                    id="Deadline"
                                    placeholder="Deadline"
                                    value={deadline} onChange={(e) => setDeadline(e.target.value)}
                                    className="rounded-md w-60 border-2 border-gray-300 p-2" />
                            </div>
    
                            <div className="mb-4">
                                <h1>Assignee:</h1>
                                <input
                                    type="text"
                                    id="Assignee"
                                    placeholder="Assignee"
                                    value={assignee} onChange={(e) => setAssignee(e.target.value)}
                                    className="rounded-md w-60 border-2 border-gray-300 p-2" />
                            </div>
                            
                            <button type="submit" className="bg-blue-500 w-40 text-white rounded-md py-2 px-4">Submit</button>
                        </div>
                    </form>
                </div>
        </div>);
}

export default CreateTask;