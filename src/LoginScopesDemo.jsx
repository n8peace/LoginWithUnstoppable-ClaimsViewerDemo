import UAuth from "@uauth/js"
import React, { useState } from "react";

import "./login-components//stylesheets/LoginWithPopup.css"
import udLogo from "./assets/ud-logo-lockup.svg"
import ClaimsTable from "./login-components/ClaimsTable"
import AnimatedDemo from "./animated-demo-components/AnimatedDemo";



let redirectUri = "";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    redirectUri = "http://localhost:3000"
}else(
    redirectUri = "https://loginwithunstoppable.com/"
)
const uauth = new UAuth({
    clientID: "943accc4-7610-4dbe-9fb4-aff7076a2da8",
    redirectUri: redirectUri,
    scope: "openid wallet email:optional profile:optional social:optional badges:optional"
  }
)


const getUsername = () => {
    try{
        let usernameString = window.localStorage.username;
        return(JSON.parse(usernameString).value)
    }catch(e){
        return("")
    }
}

const getButtonText = () => {
    let buttonText = "";
    const username = getUsername();
    if(username){
        buttonText = username;
    }else{
        buttonText = "Login With Unstoppable"
    }
    return buttonText;
}


function safeMakeSocialData(authorization, app){
    let data = {}
    try{
        data["handle"] = authorization.idToken[app].location;
        data["verified"] = String(authorization.idToken[app].verified);
        if (app==="twitter"){
            data["followers"] = authorization.idToken[app].metrics.follower;
            data["following"] = authorization.idToken[app].metrics.following;
            data["tweets"] = authorization.idToken[app].metrics.tweets;          
        }
    }catch(e){
        console.log("Couldn't find data for: ",app)
    }
    return(data)
}

function LoginScopesDemo(){

    let [user,setUser] = useState(undefined);
    let [authorization,setAuthorization] = useState(undefined);
    let [error, setError] = useState("");

    let [loggedIn, setLoggedIn] = useState(false);
    let [loading, setLoading] = useState(false);

    let [domainData, setDomainData] = useState({});
    let [profileData, setProfileData] = useState({});
    let [emailData, setEmailData] = useState({});
    let [socialsData, setSocialsData] = useState({});
    let [verifiedAddressesData, setVerifiedAddressesData] = useState({});
    let [badgesData, setBadgesData] = useState({});


    const handleLogin = () => {
        setLoading(true)
        uauth
            .loginWithPopup()
            .then((authorization)=>{
                setAuthorization(authorization)
                handleLoginState(authorization)
                handleClaims(authorization)
            })
            .then(()=>uauth.user().then(setUser))
            .catch(setError)
            .finally(()=>setLoading(false))
    }

    const handleLogout = () =>{
        setLoading(true)
        uauth
            .logout()
            .then((authorization)=>{
                setAuthorization(undefined)
                setUser(undefined)
                handleLoginState(authorization)
                handleClaims(authorization)
            })
            .catch(setError)
            .finally(()=>setLoading(false))
    }


    const handleLoginState = (authorization) => {
        if (authorization){
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
    }
    
    const handleClaims = (authorization) => {
        // This is not the best practice to handle this way, but I'm on a call
        //    and multitasking so it is what it is. Use better practice
        //    if you're doing this for a production app!!!!!
        console.log("Handling Claims...")
        console.log({authorization})
        let temp = {}

        // Domain
        temp = {}
        temp["domainName"] = authorization.idToken.sub;
        temp["walletAddress"] = authorization.idToken.wallet_address;
        temp["ipfsHash"] = authorization.idToken.ipfs_website;
        setDomainData(temp)

        // Profile
        temp = {}
        temp["name"] = authorization.idToken.name;
        temp["bio"] = authorization.idToken.description;
        temp["location"] = authorization.idToken.location;
        temp["profile"] = authorization.idToken.profile;
        setProfileData(temp)

        // Email
        temp = {}
        temp["email"] = authorization.idToken.email;
        temp["emailVerified"] = authorization.idToken.email_verified;
        setEmailData(temp)

        // Socials 
        temp = {}
        temp["twitter"]=safeMakeSocialData(authorization, "twitter")
        temp["telegram"]=safeMakeSocialData(authorization, "telegram")
        temp["discord"]=safeMakeSocialData(authorization, "discord")
        temp["reddit"]=safeMakeSocialData(authorization, "reddit")
        temp["youtube"]=safeMakeSocialData(authorization, "youtube")
        setSocialsData(temp)

        // Verified Addresses
        temp = {}
        authorization.idToken.verified_addresses.forEach(item => temp[item.symbol]=item.address)
        setVerifiedAddressesData(temp)

        // Badges
        temp = {}
        authorization.idToken.badges.forEach(item => temp[item.code]={"description":item.description, "logo":item.logo})
        authorization.idToken.badges.forEach(item => console.log(item))
        setBadgesData(temp)
    }

    return(
        <div id="login-options-container" className="login-options-container">
            <img src={udLogo} style={{ height: 100, width: 200, alignSelf: "right"}} alt="udlogo"/>
            <h1>Login With Unstoppable Demo</h1>
            <div className="login-section">
                <p className="tip"> Login With Unstoppable has a variety of scopes. Try logging in below to check out what your app can get! </p>
                <h3><a href="https://docs.unstoppabledomains.com/login-with-unstoppable/scopes-for-login/#scopes-for-login">Full Documentation</a></h3><br/>
                <button id="udlogin" className="udlogin" onClick={handleLogin}>{getButtonText()}</button>
                {loggedIn && <div><button id="udlogout" className="udlogout" onClick={handleLogout}>Logout</button></div>}
                {loggedIn &&<AnimatedDemo 
                    domainData={domainData}
                    profileData={profileData}    
                    emailData={emailData}
                    socialsData={socialsData}
                    verifiedAddressesData={verifiedAddressesData}
                    badgesData={badgesData}
                />}
            </div>
        </div>
    )
}

export default LoginScopesDemo;