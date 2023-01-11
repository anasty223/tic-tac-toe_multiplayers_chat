import React, { useState } from 'react'
import Board from './Board'
import './Chat.css'
import {Window, MessageList,MessageInput} from 'stream-chat-react'

function Game({channel,setChannel}) {
const [playersJoin, setPlayersJoin] = useState(channel.state.watcher_count===2)

const [result,setResult]=useState({winner:"none",state:"none"})
channel.on("user.watching.start",(event)=>{
  setPlayersJoin(event.watcher_count===2)
})

  if(!playersJoin){
    return <div>Waiting for other player to join...</div>
  }
  return (
    <div className='gameContainer'>
      <Board result={result} setResult={setResult}/>
   <Window>
    <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]}/>
    <MessageInput noFiles/>
   </Window>
<button onClick={async()=>{
await channel.stopWatching();
setChannel(null)
}}>Leave Game</button>
{result.state ==="won" && <div>{result.winner}Won The Game</div>}
{result.state ==="tie" && <div>Game Tie</div>}
      </div>
  )
}

export default Game