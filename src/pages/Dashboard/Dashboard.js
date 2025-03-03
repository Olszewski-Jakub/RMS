import React, { useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../constants/routes";


export default function Dashboard(){
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const handleLogoutClick = () => {
        logout()
        navigate(ROUTES.HOME);
    }
    return(
            <button onClick={logout}>Dashboard</button>

    );
}