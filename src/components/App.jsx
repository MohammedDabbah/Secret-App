import React from "react";
// import Header from "./Header";
import Login from "./Login";
import User from "./User";
// import Footer from "./Footer";
import Register from "./Register";
import Verification from "./Verification";
import {Route,Routes,BrowserRouter} from "react-router-dom"
import ChangePassword from "./ChangePassword";
// const istrue=true;
function App(){
    return (
            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}></Route>
                <Route path="/Verification" element={<Verification />} />
                <Route path="/Register" element={<Register/>}></Route>
                <Route path="/User" element={<User name=""/>}></Route>
                <Route path="/User/ChangePassword" element={<ChangePassword/>}></Route>
                <Route path="/ChangePassword" element={<ChangePassword/>}></Route>
                </Routes>
                </BrowserRouter>
    )
}

export default App;