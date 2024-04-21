import React from "react";

import { useState } from "react";





export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  // Function to handle login form submission

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if( username === "" || password === "" ) {
      alert("Please fill all the fields");
    } else {

      const formData = new FormData();
      
      formData.append('username', username);
      formData.append('password', password);

      fetch('http://localhost:8080/login',{
        method: 'POST',
        body: formData
      })
      .then((response) => {
       
        const location = response.headers.get("Location")
        if(location?.includes("error"))
        {
          alert("Invalid credentials");
        }else{
          window.location.href="/training-list"
        }

      })
      .catch((error) => console.error('Error:', error))
      
    }
  };
      
    



  return (


    <>
    <h1>login</h1>
    <form>
      <input type="text" onChange={(e)=> setUsername(e.target.value)} value={username}/>
      <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
      <button onClick={(e) => {
        e.preventDefault();
        handleSubmit(e);
      
        console.log(username + ' '+ password);
      }}>Login</button>
    </form>
    </>
  );
}
