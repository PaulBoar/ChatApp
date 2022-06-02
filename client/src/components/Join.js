import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Join.module.css';

function Join({ socket, onLogIn }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {

    if (name && room) {
      socket.emit('join_room', room);
      onLogIn(name, room);
      setRoom('');
      setName('');
    }
 
  };

  const joinGlobal = () => {
    if (name && !room) {
      socket.emit('join_global', name)
    }
    onLogIn(name)
  }

  return (
    <div className={classes.container}>
      <div className={classes['inner-container']}>
        <h1>Join a Chat</h1>
        <div>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Room'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button
            className={`${classes['room-btn']} ${classes.btn}`}
            type='button'
            onClick={joinRoom}
          >
            Join the room
          </button>
        </Link>
        <p>OR</p>
        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to={`/chat?name=${name}&global`}
        >
          <button
            className={`${classes['chat-btn']} ${classes.btn}`}
            type='button'
            onClick={joinGlobal}
          >
            Join General Chat
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
