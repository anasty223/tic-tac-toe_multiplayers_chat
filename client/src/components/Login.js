import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import {TextField,Button,FormGroup } from '@mui/material';
import toast,{Toaster} from 'react-hot-toast';

function Login({setIsAuth}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      if(username,password){
        setIsAuth(true)
        toast.success("Success");
      }else{
        toast.error("Enter data");
      }

    });
  };
  return (
    <div className="login">
 
<FormGroup style={{marginLeft:20,padding:20}}>
      <TextField
      id="outlined-basic" label="Username..." variant="outlined"
      style={{marginTop:10}}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <TextField
       id="outlined-basic" label="Password..." variant="outlined"
        type="password"
        style={{marginTop:10}}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button style={{backgroundColor:"#001f54",marginTop:5}} variant="contained" onClick={login}> Login</Button>
      </FormGroup>

    </div>
  );
}

export default Login;