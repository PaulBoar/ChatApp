import React, {useState} from 'react';

import './App.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Form from './components/Main/Form'
import MessagesDisplay from './components/Main/MessagesDisplay'


function App() {
  const [msg, setMsg] = useState()

  const handleMsg = (msg) => {
    setMsg(msg)
  }


  return (
    <div className='app'>
    <Header /> <br/>
    <MessagesDisplay message={msg}/>
    <Form getMsg={handleMsg} />
    </div>
  );
}

export default App;
