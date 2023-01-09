import React, { useState } from 'react'

function Game({channel}) {
const [playersJoin, setPlayersJoin] = useState(channel.state.watcher_count===2)

channel.on("user.watching.start",(event)=>{
  setPlayersJoin(event.watcher_count===2)
})

  if(!playersJoin){
    return <div>Waiting for other player to join...</div>
  }
  return (
    <div>Game</div>
  )
}

export default Game