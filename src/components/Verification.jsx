import axios from "axios";
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

function Verification() {

    const [code,setCode]=useState("");
    const nav=useNavigate();
    const [isTrue,setIsTrue]=useState(false);

    async function handleSubmit(event){
        event.preventDefault();
        const response=await axios.post("http://localhost:8000/Verification",{code},{ withCredentials: true });
        if(response.data==="not match"){
            setIsTrue(true);
        }else{
        const result=await axios.get("http://localhost:8000/User",{withCredentials:true});
        if(result.data){
            nav("/User", { state: { data: result.data } });
        }}
    }
    return (
        <div style={{ margin: "10% 40%" }}>
            <div className="col-lg-12">
                <Card style={{ width: '20rem', textAlign: "center", borderStyle: "none" }}>
                    <Card.Img variant="top" src="photo/key.png" style={{ borderRadius: "100%" }} />
                    <Card.Title>
                        <h3>Enter your Verification Code!</h3>
                    </Card.Title>
                    <Card.Body>
                        <form action="/Verification" method="post" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className=" userInput"  onChange={(event)=>setCode(event.target.value)}/>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-outline-danger btn-lg" style={{ marginBottom: "10px" }}>Enter</button>
                            </div>
                        </form>
                        {isTrue && <h6 style={{color:"red"}}>Code not match!</h6>}
                        <div>
                            <h6>Didn't get a code?</h6>
                            <a href="/Verification" onClick={async ()=>{
                                await axios.get("http://localhost:8000/Verification",{withCredentials:true})
                            }}>Click to send again!</a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Verification;
