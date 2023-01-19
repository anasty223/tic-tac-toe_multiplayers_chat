import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
             Leave Game
      </button>
      {result.state === "won" && <h2> {result.winner}<span>W</span><span>O</span><span>n</span><span> </span><span>T</span><span>H</span><span>E</span><span> </span><span>G</span><span>A</span><span>M</span><span>E</span><span>!</span></h2>}
      {result.state === "tie" && <h2> <span>G</span><span>A</span><span>M</span><span>E</span><span> </span><span>T</span><span>I</span><span>E</span><span>!</span></h2>}
    </div>
  );
}

export default Game;




