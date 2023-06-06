import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
    
  );
}

export default App;
