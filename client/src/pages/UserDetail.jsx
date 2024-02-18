import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserDetail = ()=>{
    const [user,setUser] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

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
                setUser(response.data);
                setName(response.data.name);
            }
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }

    useEffect(()=>{
        getUser();
    },[])

    const changePassword = async()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user_id = localStorage.getItem("user_id");
        const data={
            user_id,
            name,
            email:user.email,
            password
        }
        await axios.post("http://127.0.0.1:3001/auth/changepassword",data,{
            headers:{
                "Authorization": "Bearer "+ accessToken,
                "refreshToken": "Bearer "+refreshToken
            },
            params:{
                user_id,
            }
        }).then((response)=>{
            console.log(response.data);
            navigate("/home");
        }).catch((error)=>{
            console.error(error);
            navigate("/");
        });
    }
    return(
        <div className="userdetail">
            <Navbar/>
            <div className="px-10 py-10 bg-slate-200 w-full">
                <div className="bg-white">
                    <div className="text-2xl justify-center flex">
                        <b>User Detail</b>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Name:</b>
                        <input
                                type="text"
                                id="Name"
                                placeholder="Name"
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Email:</b>
                        <input
                                type="text"
                                id="Email"
                                placeholder="email"
                                value={user.email}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Role:</b>
                        <h1>User</h1>
                    </div>
                    <div className="bg-white text-start my-4 text-2xl px-4">
                        <b>Change password?</b>
                        <input
                                type="text"
                                id="Password"
                                placeholder="New password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                    </div>
                    
                    <div className="bg-white justify-between my-4 text-2xl px-4">
                        <h1 className="bg-blue-200 text-2xl rounded px-1 mr-2" onClick={changePassword}>Change Password</h1>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default UserDetail;