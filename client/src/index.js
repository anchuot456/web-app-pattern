import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import CreateTask from "./pages/CreateTask";
import UserDetail from "./pages/UserDetail";
import Event from "./pages/Event";
import Task from "./pages/Task";

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/create" element={<CreateEvent />} />
      <Route path="/event/detail/:event_id" element={<EventDetail />} />
      <Route path="/task/create/:event_id" element={<CreateTask />} />
      <Route path="/task" element={<Task />} />
      <Route path="/profile" element={<UserDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
