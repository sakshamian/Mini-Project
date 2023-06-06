import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import send from '../images/send.png';
const socket = io("http://localhost:8000");

const Chat = () => {
    const [mssgArr, setMssgArr] = useState(["Hi There👋"]);
    const [text, setText] = useState();

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const submitText = () => {
        if(text !== ''){
            setMssgArr([...mssgArr, text]);
            setText('');
        }
    }

    socket.on("Hello", async (arg) => {
        console.log(arg);
        setMssgArr([...mssgArr, arg]);
    });
    
    console.log(mssgArr);

  return (
    <div className='chat-screen'>
        <div className='content'>
            <div className='mssg-container'>
            
            {mssgArr.map((ele, ind) => {
                return <div className='message' key={ind}>{ele}</div>
            })}
            </div>
            <div className='input-container'>
                <input placeholder='Message' value={text} className='input-box' onChange={handleChange}/>
                <button className='send-btn' onClick={submitText}>
                    <img src={send} height={40} width={40} alt='send'/>
                </button> 
            </div>
        </div>
        
        
    </div>
  )
}

export default Chat