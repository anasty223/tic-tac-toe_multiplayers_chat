import React, { useState } from 'react'
import {useChatContext, Channel} from "stream-chat-react";
import Game from './Game';
import {TextField,Button} from '@mui/material';
import toast from 'react-hot-toast';
function JoinGame() {
  const [rivalUserName, setRivalUserName] = useState("");
const {client}= useChatContext();
const [channel, setChannel] = useState(null)

const createChannel = async () => {
  const response = await client.queryUsers({ name: { $eq: rivalUserName } });

  if (response.users.length === 0) {
    toast.error("User not found");
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
   
     <Channel channel={channel}>
      <Game channel={channel}/>
      </Channel>
    ) : (
      <div className="joinGame">
        <h4>Create Game</h4>
        <TextField

id="outlined-basic" label="Username of rival..." variant="outlined"
          
          onChange={(event) => {
            setRivalUserName(event.target.value);
          }}
        />
     
        <Button onClick={createChannel}   color="secondary"
  size="large"
className='buttonJoin'
style={{marginLeft:10,height:55}}
  variant="filled"> Join/Start Game</Button>



      </div>
    )}
  </>
  )
}

export default JoinGame