import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

function ChangePassword(){
    const [isTrue,setIsTrue]=useState(false);
    const [isSubmit,setIsSubmit]=useState(false);
    const [mailNotFound,setMailNotFound]=useState(false);
    const [username,setUsername]=useState("");
    const [code,setCode]=useState("");
    const [password,setPassword]=useState("");
    const [process,setProcess]=useState(false);
    const nav=useNavigate();

    async function handleSubmit1(event){
        event.preventDefault();
        const result=await axios.get(`http://localhost:8000/ChangePassword?username=${username}`,{withCredentials:true});
        if(result){
            if(result.data==="failed"){
                setIsSubmit(false);
                setMailNotFound(true);
            }if(result.data==="success"){
                setIsSubmit(true);
                setMailNotFound(false);
            }
        }
    };
    async function handleSubmit2(event){
        event.preventDefault();
        const result= await axios.post("http://localhost:8000/ChangePassword",{username,password,code},{withCredentials:true});
        if(result){
            console.log(result);
            if(result.data==="failed"){
                setIsTrue(true);
            }
            if(result.data==="success"){
                setIsSubmit(false);
                setIsTrue(false);
                setProcess(true);
            }
        }
    };


   return <div style={{ margin: "10% 40%" }}>
   <div className="col-lg-12">
       <Card style={{ width: '20rem', textAlign: "center", borderStyle: "none" }}>
           <Card.Title>
               <h3>Enter your email to get a code to help us to verify you</h3>
           </Card.Title>
           <Card.Body>
               <form action="/Verification" method="post" onSubmit={handleSubmit1}>
                   <div className="mb-3">
                       Mail: <input type="text" className=" userInput" onChange={(event)=>setUsername(event.target.value)} required/>
                   </div>
                   <div className="d-grid gap-2">
                       <button type="submit" className="btn btn-outline-danger btn-lg" style={{ marginBottom: "10px" }}>Send <SendIcon/></button>
                   </div>
               </form>
               {isSubmit && <div>
               <h6>insert here!</h6>
                <form action="/ChangePassword" method="post" onSubmit={handleSubmit2}>
                <div className="mb-3">
                       Code: <input type="text" className=" userInput" onChange={(event)=>setCode(event.target.value)} required/>
                   </div>
                   <div className="mb-3">
                       Pass: <input type="password" className=" userInput" onChange={(event)=>setPassword(event.target.value)} required/>
                   </div>
                   <div >
                       <button type="submit" className="btn btn-outline-danger" style={{ marginBottom: "10px" }}>Submit</button>
                   </div>
                </form>
                <div>
                {isTrue && <div><h6 style={{color:"red"}}>Invalid code!</h6></div>}
                   <h6>Didn't get a code?</h6>
                   <button className="btn" style={{textDecoration:"underline",color:"blue"}} onClick={async ()=>{
                       await axios.get(`http://localhost:8000/ChangePassword?username=${username}`,{withCredentials:true})
                   }}>Click to send again!</button>
               </div>
               </div>}
               {mailNotFound && <h6 style={{color:"red"}}>Invalid mail!</h6>}
               {process&& <div>
                <h6>password changed successfully</h6>
                <button className="btn" onClick={()=>nav(-1)}>Go back</button>
               </div>}
           </Card.Body>
       </Card>
   </div>
</div>
};

export default ChangePassword;