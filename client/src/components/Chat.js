import React, { useEffect, useState } from 'react';

import classes from './Chat.module.css'

function Chat({ socket, name, room }) {
  const [currentMsg, setCurrentMsg] = useState('');
  const [messageList, setMessageList] = useState([])

  const handleSend = async () => {
    if (currentMsg) {
      const messageData = {
        room,
        author: name,
        message: currentMsg,
        date: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };
     await socket.emit('send', messageData);
     setMessageList(prevList => [...prevList, messageData])
     console.log('send', messageData)
    }
    setCurrentMsg('');
  };

  useEffect(() => {
    socket.on('receive', (data) => {
      setMessageList(prevList => [...prevList, data])
      console.log('receive', data)
    })
  }, [socket])

  return (
    <div className={classes.container}>
      <div className={classes['chat-header']}>
        <p>Live Chat</p>
      </div>
      <div className={classes['chat-body']}>
      {messageList.map(message => {
        return <div key={message.date}>{message.message}</div>
      })}
      </div>
      <div className={classes['chat-footer']}>
        <input
          type='text'
          placeholder='message'
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={handleSend}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
