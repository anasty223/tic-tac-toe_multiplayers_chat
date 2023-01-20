import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import {TextField,Button,FormGroup } from '@mui/material';
import toast,{Toaster} from 'react-hot-toast';

function SignUp({setIsAuth}) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("https://servertictac.onrender.com", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
if(user){
  setIsAuth(true)

}else{
  toast.error("Enter data");
}

   
    });
  };
  return (
    <div className="signUp">

     <FormGroup  style={{ borderRight:"3px  dashed #1282a2",padding:20}} >
       <TextField 
      id="outlined-basic" label="First Name..." variant="outlined"
      style={{marginTop:10}}
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <TextField 
      id="outlined-basic" label="Last Name..." variant="outlined"
      style={{marginTop:10}}
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <TextField 
      id="outlined-basic" label="Username..." variant="outlined"
      style={{marginTop:10}}
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <TextField 
           id="outlined-basic" label="Password..." variant="outlined"
           style={{marginTop:10}}
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <Button style={{backgroundColor:"#001f54",marginTop:5}}  variant="contained" onClick={signUp}> Sign Up</Button>
      
      </FormGroup >
      <Toaster
  position="top-left"
  reverseOrder={false}
/>
    </div>
  );
}

export default SignUp;