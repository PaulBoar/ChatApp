import React, { useEffect, useState, useRef } from 'react';

import classes from './Chat.module.css';

function Chat({ socket, name, room }) {
  const [currentMsg, setCurrentMsg] = useState('');
  const [messageList, setMessageList] = useState([]);
  const scrollMsgs = useRef(null);

  const handleSend = async () => {
    if (currentMsg) {
      const messageData = {
        room,
        author: name,
        message: currentMsg,
        date:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send', messageData);
      setMessageList((prevList) => [...prevList, messageData]);
      console.log('send', messageData);
    }
    setCurrentMsg('');
  };

  useEffect(() => {
    socket.on('receive', (data) => {
      setMessageList((prevList) => [...new Set([...prevList, data])]);
      console.log('receive', data);
    });
  }, []);

  useEffect(() => {
    scrollMsgs.current?.scrollIntoView();
  }, [messageList]);

  return (
    <div className={classes.container}>
      <div className={classes['chat-header']}>
        <p>Live Chat</p>
      </div>
      <div className={classes['chat-body']}>
        {messageList.map((messageData, index) => {
          const classInput =
            name === messageData.author ? `${classes.you}` : `${classes.other}`;
          return (
            <div key={index} id={classInput} className={classes.message}>
              <div>
                <div className={classes['message-content']}>
                  {messageData.message}
                </div>
                <div className={classes['message-info']}>
                  {messageData.date}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollMsgs} />
      </div>
      <div className={classes['chat-footer']}>
        <input
          type='text'
          placeholder='message'
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
