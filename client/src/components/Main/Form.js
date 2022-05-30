import React, {useState} from 'react'

import classes from './Form.module.css'

function Form() {
  const [inputMsg, setInputMsg] = useState('')
  const [message, setMessage] = useState('')


  const handleInput = (e) => {
    setInputMsg(e.target.value)
  }
  // console.log(inputMsg)

  const handleSubmit = (e) => {
    e.preventDefault()

    setMessage(inputMsg)
  }
 

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      
      <input type='text' placeholder='Aa' value={inputMsg} onChange={handleInput} />
      <button className={classes.btn}>Send</button>
    </form>
  )
}

export default Form