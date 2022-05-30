import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { MsgCtx } from './Form';

import classes from './MessagesDisplay.module.css';

const socket = io.connect('http://localhost:3001');

function MessagesDisplay(props) {
  const [id, setId] = useState();
  const [msgList, setMsgList] = useState([{ name: 'mglist', type: 'send' }]);
  const [recivedMsg, setRecivedMessage] = useState({
    name: 'hello',
    type: 'recived',
  });
  const [recivedList, setRecivedList] = useState([]);

  useEffect(() => {
    console.log(props.message);
    setMsgList((prevList) => [...prevList, props.message]);
  }, [props.message]);
  // useEffect(() => {
  //   setMsgList((prevList) => [
  //     ...prevList,
  //     { name: recivedMsg, type: 'recived' },
  //   ]);
  // }, [recivedMsg]);

  console.log(msgList);

  useEffect(() => {
    socket.on('recive-msg', (data) => {
      setRecivedMessage({ name: data.name, type: 'send' });
    });
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setId(socket.id);
    });
  }, [socket]);

  return (
    <div className={classes.display}>
      <div className={classes.header}>you id: {id}</div>
      <ul className={classes.messages}>
        <div className={classes.message}>HEY</div>
        <div className={classes.message}>HEYlo</div>
        {msgList.map((msg) => {
          return <div className={classes.message}>{msg.name}</div>;
        })}
        {/* {recivedList.map((recived) => {
          return <div className={classes.recived}>{recived.name}</div>;
        })} */}
      </ul>
    </div>
  );
}

export default MessagesDisplay;
