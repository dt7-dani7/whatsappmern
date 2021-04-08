import React, {useEffect} from 'react';
import './App.css';
import Sidebar from "./Sidebar.js";
import Chat from "./Chat.js";
import Pusher from "pusher-js";
function App() {
  useEffect( () => {
    const pusher = new Pusher('964d374873f90df5ae9b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, [])
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
