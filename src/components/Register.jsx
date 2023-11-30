import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function Register(){

    const[name,setName]=useState("");
    const [username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [flag,setFlag]=useState(false);
    const [codeInput,setCodeInput]=useState("");
    const[check,setCheck]=useState(false);
    const nav=useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:8000/Register",{name,username,password,codeInput},{withCredentials: true})
        .then(result=>{
            if(result.data!=="failed"){
              console.log(result.data);
              nav("/User",{state:{data:result.data}});
            }else{
              setCheck(true);
            }
          })
        setFlag(true);

        
    }


    return<div>
    <Header/>
     <div  style={{marginLeft:"35%",marginTop:"7%",marginRight:"35%"}}>
       <Card style={{ width: '25rem',textAlign:"center"}}>
        <Card.Title>Sign up</Card.Title>
        <Card.Body>
            {flag ? <div><form action="/Register" method="post" onSubmit={handleSubmit}><Card.Text>
              <h5 style={{color:'red'}}>to confirm your email please enter the code we sent to you</h5>
              <input type="text" className="userInput" placeholder="Please enter your code" value={codeInput} onChange={(event)=>setCodeInput(event.target.value)} required></input>
              <button type="submit" className="btn btn-outline-primary" style={{padding:"3px 20px 3px 20px",marginLeft:"3px"}}><DoneOutlineIcon/></button>
            </Card.Text> 
            </form>
            {check&& <h6 style={{color:"blue"}}>The code you enter is incorrect or the username you add is already in use</h6>}
            <h6>if you did't get a code</h6>
            <Card.Text><a href="">Clike here to send code again</a></Card.Text></div>:<div><form action="/Register" method="get" onSubmit={handleSubmit}>
            <Card.Text><h6 style={{textAlign:"left"}}>Name:</h6><input type="text"  className="userInput" placeholder="Full Name" autoComplete="false" required onChange={event=>setName(event.target.value)}></input></Card.Text>
            <Card.Text><h6 style={{textAlign:"left"}}>Mail:</h6> <input type="email"  className="userInput" placeholder="..@example.com" autoComplete="false" required onChange={event=>setUsername(event.target.value)}></input></Card.Text>
            <Card.Text><h6 style={{textAlign:"left"}}>Password:</h6><input type="password"  className="userInput" placeholder="password" autoComplete="false" required minLength={8} onChange={event=>setPassword(event.target.value)}></input></Card.Text>
            <Card.Text><a href="/Register" className="btn btn-outline-secondary" onClick={(event)=>{
              event.preventDefault();
              axios.get(`http://localhost:8000/Register?username=${username}`,{withCredentials:true});
              setFlag(true);
            }}>Submit</a></Card.Text>
            </form> <Card.Text><a href="/">already have acount?</a></Card.Text></div>}
        </Card.Body>
       </Card>
    </div>
    <Footer/>
    </div>
}

export default Register;