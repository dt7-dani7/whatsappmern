import React, {useEffect, useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar.js";
import Chat from "./Chat.js";
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  const [messages, setMessges] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessges(response.data);

    })
  }, [])
  useEffect( () => {
    const pusher = new Pusher('964d374873f90df5ae9b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessges([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);

  return (
      <div className="app">
        <div className="app__body">
        <Sidebar/>
        <Chat/>
        </div>
        
      </div>
  );
}

export default App;
