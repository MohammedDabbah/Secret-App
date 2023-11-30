import axios from "axios";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import { useLocation, useNavigate } from "react-router-dom";
import Secrets from "./Secrets";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

function User(props){
    
const locate=useLocation();
const [secret,setSecret]=useState("");
const [array,setArray]=useState(locate.state.data.secrets);
const username=locate.state.data.username;
const name=locate.state.data.name;
const [flag,setFlag]=useState(false);
const nav =useNavigate();
// const [name,setName]=useState(locate.state.data.name);

// useEffect(() => {
//     // Fetch data when the component mounts
//     axios.get("http://localhost:8000/Home")
//         .then(result => {
//             setName(result.data.name);
//             setArray(result.data.secrets);
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//         });
// }, []);

function handleClick(){
    axios.post("http://localhost:8000/User",{secret,username},{withCredentials: true}).then(result=>{setArray(result.data)}).then(console.log("data transfer"));
    setFlag(false);
    setSecret('');
    // .then(result=>{
    //     if(result.data){
    //        setArray(result.data.secrets)
    //        console.log(array)
    //     }
    // })

}
// function Clicke(event){
//     // array.splice(event.target.value,1);
//     const index=event.target.value;
//     // axios.post("http://localhost:8000/delete",{array,username},{withCredentials: true}).then(result=>{setArray(result.data.secrets)}).then(console.log("array updated!"));
//     // window.location.reload();
//     axios.post("http://localhost:8000/delete",{withCredentials:true},{index})
//     .then(response => {
//         console.log(response.data);
//         // Handle the response accordingly
//     })
//     .catch(error => {
//         console.error(error);
//     });
   
// }
async function Clicke(event) {
    const index = event.target.value;
    setFlag(false);
    try{
        const response= await axios.post("http://localhost:8000/delete", { index ,username}, { withCredentials: true });
        if(response.data){
            setArray(response.data);
        }
    }catch(err){
        console.log(err);
    }
}

// setArray(location.state.secrets);

    return<div >
        <Navbar bg="light" data-bs-theme="light">
        <Container>
        <Navbar.Brand style={{fontFamily:"Cursive"}}>
  <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><SettingsIcon/></button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" onClick={()=>nav("ChangePassword")}>Change password</button></li>
  </ul> 
{name}</Navbar.Brand>
         <Nav >
            <form method="post" action="/Logout" onSubmit={event=>{
                event.preventDefault();
                axios.post("http://localhost:8000/Logout",{withCredentials: true}).then(result=>{
                if(result.data==="logout"){
                    console.log("logout")
                    nav("/");
                  }
            })
            }}>
          <button className="btn btn-light" style={{textAlign:"right",borderRadius:"30%",borderStyle:"inset"}}>logout <LogoutIcon/></button>
          </form>
         </Nav>
         </Container>
         </Navbar>
        <div className="user">
        <div style={{display:"flex"}}>
        <img src="photo/padlock-icon.jpg" alt="unlock" style={{width:"18rem",borderRadius:"50%",borderStyle:"outset",marginTop:"10px"}}></img>
        <div style={{width:'220rem',fontFamily:"fantasy",paddingLeft:"20px",marginTop:"100px"}}>
            <h3 style={{fontStyle: "italic",color:"white"}}>"Secrets are whispers of the soul, concealed in the chambers of trust, waiting to unveil the magic of hidden stories."</h3>
        </div>
        </div>
        
        {/* <div style={{marginTop:"15px"}}>
        <Card style={{ textAlign:"center",borderStyle:"none"}}>
        <Card.Title style={{color:"red",fontStyle:"inherit",marginTop:"10px",fontFamily:"Monospace"}}>Welcome<SentimentVerySatisfiedOutlinedIcon/></Card.Title>
        <Card.Title style={{fontFamily:"Fantasy"}}>Your secret will be safe here</Card.Title>
        <Card.Body>
            <form action="/User" method="post" onSubmit={event=>event.preventDefault()}>
            <Card.Text>
            <div className="form-floating" style={{width:"20rem",textAlign:"center"}}>
                <textarea className="form-control" value={secret} placeholder="type a secret..." style={{borderStyle:"ridge",
                height:flag&& "7rem",
                 backgroundImage: "url(photo/paper.jpg)"
                 
                }} onChange={event=>{setSecret(event.target.value)}} required onClick={()=>setFlag(true)}></textarea>
                <label for="floatingTextarea" style={{ color:"#AAB1B0"}}>type a secret...</label>
                </div>
            </Card.Text>
            
            <Button variant="outline-primary" size="lg" onClick={handleClick} >Save<SouthOutlinedIcon/></Button>
          
            </form>
        </Card.Body>
        </Card>
        </div> */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
        <div className="card" style={{width: "20rem"}}>
        <div className="card-body">
         <h5 className="card-title" style={{textAlign:"center"}}>Welcome <SentimentVerySatisfiedOutlinedIcon/></h5>
         <p className="card-text"></p>
         <form action="/User" method="post" onSubmit={event=>event.preventDefault()}>
         <div className="form-floating">
                <textarea className="form-control" value={secret} placeholder="type a secret..." style={{borderStyle:"ridge",
                height:flag&& "7rem",
                 backgroundImage: "url(photo/paper.jpg)"
                 
                }} onChange={event=>{setSecret(event.target.value)}} required onClick={()=>setFlag(true)}></textarea>
                <label htmlFor="floatingTextarea" style={{ color:"#AAB1B0"}}>type a secret...</label>
                </div>
                <div className="card-text" style={{textAlign:"center",lineHeight: "4rem"}}>
                <Button variant="outline-primary" size="lg" onClick={handleClick} >Save<SouthOutlinedIcon/></Button>
                </div>
         </form>
        </div>
        </div>
        </div>
        </div>
        
        
       
        <div className="row">{array.map((x,i)=>{
            return(
               
                <div key={i} className="col-lg-4">
            <Secrets number={i+1} content={x} func={Clicke}></Secrets>
            </div>
            
            )
          
        })}</div>
        
        
        
    </div>
}

export default User;