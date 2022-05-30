import React from 'react'

import classes from './MessagesDisplay.module.css'

function MessagesDisplay() {
  return (
    <div className={classes.display}>
     <div className={classes.header}>you id: </div>
     <div className={classes.messages}>
      <div className={classes.message}>HEY</div>
     </div>
    </div>
  )
}

export default MessagesDisplay