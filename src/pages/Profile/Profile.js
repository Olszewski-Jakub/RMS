import React, { useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";


export default function Profile(){
    const {logout} = useContext(AuthContext);

    return(
        <div className="home-container">
            <button onClick={logout}/>
        </div>
    );
}