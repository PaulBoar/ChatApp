import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';
import './App.css';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  const handleLogIn = (name, room) => {
    setUserName(name);
    setRoom(room);
  };

  return (
    <>
      <Router>
         <Routes>
           <Route path='/' exact element={<Join socket={socket} onLogIn={handleLogIn}/>} />
          <Route path='/chat' exact element={<Chat socket={socket} name={userName} room={room} />} />
         </Routes>
       </Router>
      {/* <Join socket={socket} onLogIn={handleLogIn} />
      <Chat socket={socket} name={userName} room={room} /> */}
    </>
  );
}

export default App;
