import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import countryCodes from "../../constants/countryCodes.js";
import Cookies from 'js-cookie';
import { IoMdReturnLeft } from "react-icons/io";
import { Routes } from "../../constants/routes.js";
import AuthBackground from "../../assets/auth-background.jpg";

export default function Auth() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [loginForm, setLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: '+353',
        phoneNumber: ''
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const showLogin = () => {
        setLoginForm(true);
    }
    const showRegister = () => {
        setLoginForm(false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(loginForm && (name == 'email' || name == 'password')){
            setFormData((prevData) => {
                return{
                    ...prevData,
                    [name] : value
                }
            });
        }else {
            setFormData((prevData) => {
                return{
                    ...prevData,
                    [name] : value
                }
            }); 
        }

    }

    const checkPassword = () => {
        return formData.password === formData.confirmPassword;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        //console.log("register button clicked");

        if (!loginForm && !checkPassword()) {
            //console.log("Passwords do not match");
            return;
        }else if(!loginForm && checkPassword()){
            //console.log("Passwords match");
            const url = '/app/auth/register';
            const fullPhoneNumber = formData.countryCode + formData.phoneNumber;

            try {
                const res = await axios.post(url, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: fullPhoneNumber
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res.data);
                showLogin();
                
            } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
            }
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log("login button clicked");

        try{
            const url = '/app/auth/login';

            const res = await axios.post(url, {
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });

            console.log(res.data);
            console.log(res.status);

            const{idToken, refreshToken, email} = res.data;
            Cookies.set('idToken', idToken, {expires: 7});
            Cookies.set('refreshToken', refreshToken, {expires: 7});

            if(formData.email === 'ownerrms@gmail.com'){
                navigate('/owner-dashboard');
            }else{
                navigate('/customer-dashboard');
            }
        }catch(err){
            console.error(err);
        }
    }
    
    const returnHome = () => {
        navigate('/');
    }


    return (
        <div className="auth-container">
            {/*<div className="return-container" onClick={returnHome} style={{cursor: "pointer", width: "10rem", height: "3rem", position: "absolute", top: "1rem", left: "1rem", display:"flex", alignItems: "center"}}>
                <IoMdReturnLeft style={{fontSize: "2rem", marginRight: "1rem"}}/>
                <span style={{fontSize: "1rem"}}>Return Home</span>
            </div>
            <div className="content-container">
                <div className="btn-container">
                    <button className="login-btn auth-btn" onClick={showLogin}>Login</button>
                    <button className="register-btn auth-btn" onClick={showRegister}>Register</button>
                </div>
                <div className="form-container" style={{width: '100%'}}>
                    <form 
                        style={{display: 'flex', flexDirection: 'column'}}
                        onSubmit={loginForm ? handleLogin : handleRegister}
                    >
                        {loginForm ? (
                            <>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="submit-btn">Login</button>
                            </>
                        ) : (
                            <>
                                <div className="name-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        id="firstName"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        id="lastName"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter Email"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                                 <div className="phone-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        style={{ 
                                            minWidth: '25%', 
                                            padding: '10px', 
                                            height: '40px',
                                        }}
                                        required
                                    >
                                        {countryCodes.map((country) => (
                                            <option 
                                                key={country.code} 
                                                value={country.code}
                                            >
                                                ({country.code})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        placeholder="Phone Number"
                                        onChange={handleChange}
                                        style={{ 
                                            width: '70%', 
                                            padding: '10px', 
                                            height: '40px',
                                        }}
                                        required
                                    />
                                </div>
                                {/*<input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="submit-btn">Register</button>
                            </>
                        )}
                    </form>
                </div>
            </div>*/}

            <img src={AuthBackground} className="auth-background" alt="Background" />
            <div className="auth-form-container">
                <h1 style={{color: "#FF7D05", marginBottom: "2rem"}}>{loginForm ? "LOGIN" : "CREATE AN ACCOUNT"}</h1>
                <form 
                className="auth-form"
                style={{display: "flex", flexDirection: "column"}}
                onSubmit={loginForm ? handleLogin : handleRegister}>
                    {loginForm ? (
                        <>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="auth-login-btn">Sign In</button>
                            <h4 style={{display: "flex", justifyContent: "center"}}>Don&apos;t have an account?<span onClick={showRegister}> Sign Up </span></h4>
                        </>
                    ) : (
                        <>
                            <div className="reg-name-container" style={{display: "flex"}}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "45%",
                                        marginRight: "10%"
                                    }}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "45%"
                                    }}
                                />
                            </div>
                            
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="auth-reg-btn">Register</button>
                            <h4 style={{display: "flex", justifyContent: "center"}}>Already have an account?<span onClick={showLogin}> Login </span></h4>
                        </>
                    )}
                </form>
            </div>
            
        </div>
    );
}
