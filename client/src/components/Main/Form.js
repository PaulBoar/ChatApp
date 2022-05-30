import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import classes from './Form.module.css';

const socket = io.connect('http://localhost:3001');

function Form(props) {
  const [inputMsg, setInputMsg] = useState('');
  const [message, setMessage] = useState({ name: 'object', type: 'send' });

  useEffect(() => {
    setMessage({ name: inputMsg, type: 'send' });
  }, [inputMsg]);

  const handleInput = (e) => {
    setInputMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('send-msg', message);
    props.getMsg(message);
    setInputMsg('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          placeholder='Message'
          value={inputMsg}
          onChange={handleInput}
        />
        <button className={classes.btn}>Send</button>
      </div>
    </form>
  );
}

export default Form;
