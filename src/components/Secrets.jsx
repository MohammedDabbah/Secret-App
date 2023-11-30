import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';


function Secrets(props){

  //   return(
  //       <div className="card secret" style={{width: "20rem"}} >
  //    <div className="card-body">
    
  //   <h5 className="card-title" style={{textAlign:"center",color:"blue",fontStyle:"italic"}}>Secret {props.number}</h5>
    
  //    <div className="card-text" style={{color:"black"}}><h6>{props.content}</h6></div>
  //    <div style={{textAlign:"center"}}>
  //    <form method="post" action="/delete" onSubmit={event=>event.preventDefault()}>
  //    <button className="btn btn-outline-danger" style={{borderRadius:"100%"}} value={props.number-1} onClick={props.func}>delete</button>
  //    </form>
  //    </div>
  //   </div>
  //   </div>
  // )
  return(
    <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title" style={{textAlign:"right"}}>{props.number}</h5>
    <p className="card-text">{props.content}</p>
    <form method="post" action="/delete" onSubmit={event=>event.preventDefault()}>
    <button className="btn btn-outline-danger" value={props.number-1} onClick={props.func}><DeleteIcon/></button>
   </form>
  </div>
</div>
  )
    
}

export default Secrets;