import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data ={
            email,
            password
        };
        console.log(data);
        axios.post("http://127.0.0.1:3001/auth/login",data)
        .then((response)=>{
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            const user_id = response.data.user._id;
            localStorage.setItem("user_id",user_id);
            localStorage.setItem("accessToken",accessToken);
            if(refreshToken !== null){
                localStorage.setItem("refreshToken",refreshToken);
            }
            navigate("/home");

            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className="loginPage justify-items-center relative container w-3/5 mx-auto px-4 py-8 border mt-12 rounded-2xl">
            <div className="bg-slate-100 text-center text-2xl">
                <form onSubmit={handleSubmit} className="mx-2 my-2 px-2 py-2 relative">
                    <div className="mb-4 text-center">
                        <div className="mb-4">
                            <input
                                type="text"
                                id="Email"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        
                        <div className="mb-4">
                            <input
                                type="password"
                                id="familyname"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>
                        
                        <button type="submit" className="bg-blue-500 w-40 text-white rounded-md py-2 px-4">Log in</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Login;