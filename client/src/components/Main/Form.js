import React, {useState} from 'react'

import classes from './Form.module.css'

function Form() {
  const [inputMsg, setInputMsg] = useState('')

  const handleInput = (e) => {
    setInputMsg(e.target.value)
  }
  console.log(inputMsg)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {/* <label htmlFor='text'>Message</label> */}
      <input type='text' placeholder='Aa' value={inputMsg} onChange={handleInput} />
      <button className={classes.btn}>Send</button>
    </form>
  )
}

export default Form