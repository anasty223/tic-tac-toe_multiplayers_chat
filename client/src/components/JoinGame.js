import React, { useState } from 'react'

function JoinGame() {
  const [rivalUserName, setRivalUserName] = useState("")
  return (
    <div className='joinGame'><h4>Create Game</h4>
    <input placeholder='Username of rival...' onChange={(event)=>{setRivalUserName(event.target.value)}}/>
    <button>Join/Start Game</button>
    </div>
  )
}

export default JoinGame