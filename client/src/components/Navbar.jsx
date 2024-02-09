import React from "react";

const Navbar = ()=>{
    return(
        <div className="navbar flex relative w-full bg-black text-white justify-items-center">
            <a href="/home" className="px-2 text-2xl hover:bg-gray-500">Home</a>
            <a href="" className="px-2 text-2xl hover:bg-gray-500">Events</a>
            <a href="" className="px-2 text-2xl hover:bg-gray-500">Tasks</a>
            <a href="" className="px-2 text-2xl hover:bg-gray-500">Profile</a>
            <a href="" className="px-2 text-2xl hover:bg-gray-500">Logout</a>
        </div>
    );
}

export default Navbar;