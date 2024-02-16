import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName]= useState('');

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data ={
            name,
            email,
            password
        };
        console.log(data);
        axios.post("http://127.0.0.1:3001/auth/register",data)
        .then((response)=>{
            const user = response.data.newUser;
            localStorage.setItem("user_id",user._id);
            navigate("/");
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className="registerPage justify-items-center relative container w-3/5 mx-auto px-4 py-8 border mt-12 rounded-2xl">
            <div className="bg-slate-100 text-center text-2xl">
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
                                id="Email"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>

                        
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md w-60 border-2 border-gray-300 p-2" />
                        </div>
                        
                        <button type="submit" className="bg-blue-500 w-40 text-white rounded-md py-2 px-4">Register</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Register