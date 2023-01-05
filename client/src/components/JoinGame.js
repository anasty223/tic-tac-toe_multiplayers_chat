import React, { useState } from 'react'
import {useChatContext} from "stream-chat-react";


function JoinGame() {
  const [rivalUserName, setRivalUserName] = useState("");
const {client}= useChatContext();
const [channel, setChannel] = useState(null)

const createChannel = async () => {
  const response = await client.queryUsers({ name: { $eq: rivalUserName } });

  if (response.users.length === 0) {
    alert("User not found");
    return;
  }

  const newChannel = await client.channel("messaging", {
    members: [client.userID, response.users[0].id],
  });

  await newChannel.watch();
  setChannel(newChannel);
};

  return (  <>
    {channel ? (
      <h1>Game start</h1>
    ) : (
      <div className="joinGame">
        <h4>Create Game</h4>
        <input
          placeholder="Username of rival..."
          onChange={(event) => {
            setRivalUserName(event.target.value);
          }}
        />
        <button onClick={createChannel}> Join/Start Game</button>
      </div>
    )}
  </>
  )
}

export default JoinGame