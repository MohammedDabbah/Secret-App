import axios from "axios";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";







function Home(){
  
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [isTrue,setIsTrue]=useState(false);
  const nav=useNavigate();

    // async function handleSubmit(event){
    //   event.preventDefault();
    //  event.preventDefault();
    //  console.log("avhba");
    //   fetch("http://localhost:8000",{
    //   headers:{
    //     'Content-Type': 'application/json',
    //   },
    //   body:JSON.stringify({username,password}),
      
    // })
 
    // try {
      // Make the login request
      // const response=await axios.post(
      //   "http://localhost:8000/Login",
      //   { username, password },
      //   { withCredentials: true }
      // );
      // if(response.data==="failed"){
      //   setIsTrue(true);
      //   nav("/");
      // }else{

      // If login is successful, make the user request
        // nav("/Verification")
      // const result = await axios.get("http://localhost:8000/User", {
      //   withCredentials: true,
      // });

      // if (result.data) {
      //   console.log("user logged in", result.data);
      //   nav("/User", { state: { data: result.data } });
      //   // nav("/Verification")
      // } else {
      //   console.log("login failed");
      //   // Handle failed login (show error message, etc.)
      //   setIsTrue(true);
      //   nav("/")
      // }
    // }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   // Handle error if login or user request fails (show error message, etc.)
    // }

    async function handleSubmit(event) {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/Login", { username, password }, { withCredentials: true });
        if (response.data === "failed") {
          setIsTrue(true); // Set error state to show error message to the user
        } else {
          const result = await axios.get("http://localhost:8000/Verification",{withCredentials:true});
          // if (result.data === "success") {
            nav("/Verification");
          // } else {
          //   setIsTrue(true); // Handle unexpected response from the server as an error
          // }
        }
      } catch (err) {
        console.error("Error during login:", err);
        setIsTrue(true); // Set error state to show error message to the user
      }
    }
    
    
    
  


    return <div>
    <Header/>
    <div className="row">
    <div className="col-lg-12">
    <div style={{paddingLeft:"39%",marginTop:"20px"}}>
    <Card style={{ width: '20rem' ,textAlign:"center",borderStyle:"none"}}>
      <Card.Img variant="top" src="photo/lock-icon.jpg" className="lock"  />
      <Card.Title>Login to enter your secret!</Card.Title>
      <Card.Body>
      <form action="/" method="post" onSubmit={handleSubmit}>
      <Card.Text>
      <input type="text" placeholder="Username" className="userInput" onChange={(event)=>{setUsername(event.target.value)}}></input>
      </Card.Text>
      <Card.Text>
      <input type="password" placeholder="Password" className="userInput" onChange={(event)=>{setPassword(event.target.value)}}></input>
      </Card.Text>
      <input type="submit" className="btn btn-outline-secondary" value="login"></input>
        {/* <Button variant="outline-secondary" size="lg">Login</Button> */}
        </form>
        <Card.Text style={{color:"red"}}>{isTrue && "your username or password may be incorrect!"}</Card.Text>
        <Card.Text><a href="Register">not have acount?</a></Card.Text>
        <Card.Text><a href="ChangePassword">Forget your password? </a></Card.Text>
      </Card.Body>
    </Card>
    
    </div>
    </div>
    </div>
    <Footer/>
    </div>
}


export default Home;