import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import {Chat} from "stream-chat-react"
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
import {Button} from '@mui/material';
import  { Toaster } from 'react-hot-toast';

function App() {
  const api_key = "duh9vykpu5fj";
  const cookies = new Cookies();

  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const token = cookies.get("token");

const logOut=()=>{
  cookies.remove("token");
  cookies.remove("userId");
  cookies.remove("firstName");
  cookies.remove("lastName");
  cookies.remove("hashedPassword")
  cookies.remove("channelName");
  cookies.remove("username");
  client.disconnectUser()
  setIsAuth(false)

}

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
      <Chat client={client}>
         <JoinGame/>
       <Button variant="contained" onClick={logOut} style={{backgroundColor:"#034078",marginTop:10}}>Log Out</Button>
       </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}

    </div>
  );
}

export default App;
