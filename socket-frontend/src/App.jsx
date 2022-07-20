import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/pages/Register";
import Login from "./views/pages/Login";
import Chat from "./views/pages/Chat";
import SetAvatar from './shared/components/SetAvatar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/avatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
