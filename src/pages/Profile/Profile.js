import React, { useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Profile(){
    useNavigate();
    const {logout} = useContext(AuthContext);
    return(
        <button onClick={logout}>Logout</button>

    );
}