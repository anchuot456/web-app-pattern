import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const CreateEvent = ()=>{
    const [name,setName] = useState('');
    const [date,setDate] = useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription] = useState('');
    const [responsible,setResponsible] = useState('');
    const [participant,setParticipant] = useState('');

    useEffect(()=>{
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
            setResponsible(response.data.name);
        }).catch((error)=>{
            console.error(error);
        });
    },[]);

    const handleSubmit = (e)=>{

    }

    return(
    <div className="createEvent">
        <Navbar/>
        <div className="bg-slate-100 text-center text-2xl">
            <div className="py-4 text-2xl bg-slate-100 text-center w-full">
                <b>Create New Event</b>
            </div>
                <form onSubmit={handleSubmit} className="mx-2 my-2 px-2 py-2 relative">
                    <div className="mb-4 text-center">
                        <div className="mb-4">
                            <input
                                type="text"
                                id="Name"
                                placeholder="Name"
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                id="Date"
                                placeholder="date"
                                value={date} onChange={(e) => setDate(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        
                        <div className="mb-4">
                            <input
                                type="text"
                                id="location"
                                placeholder="Location"
                                value={location} onChange={(e) => setLocation(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                id="description"
                                placeholder="Description"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                id="responsible"
                                placeholder="Responsible"
                                value={responsible}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                id="participant"
                                placeholder="Participant"
                                value={participant} onChange={(e) => setParticipant(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>
                        
                        <button type="submit" className="bg-blue-500 w-40 text-white rounded-md py-2 px-4">Submit</button>
                    </div>
                </form>
            </div>
    </div>);
}

export default CreateEvent;