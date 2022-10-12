import UAuth from "@uauth/js"
import React, { useState } from "react";

import "./stylesheets/LoginWithPopup.css"
import TwitterStats from "./TwitterStats";
import DiscordStats from "./DiscordStats";
import TelegramStats from "./TelegramStats";

const uauth = new UAuth({
    clientID: "664d4358-ff56-45e7-83ee-a0947252c23d",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet social:optional"
  }
)


function LoginWithPopup(props){

    let [loggedIn, setLoggedIn] = useState(false);
    let [twitterHandle, setTwitterHandle] = useState("");
    let [twitterData, setTwitterData] = useState("");
    let [discordUsername, setDiscordUsername] = useState("");
    let [discordData, setDiscordData] = useState("");
    let [telegramUsername, setTelegramUsername] = useState("");
    let [telegramData, setTelegramData] = useState("");

    const hasSocial = (socialUsername) =>{
        if(socialUsername){
            return true;
        }else{
            return false;
        }
    }

    const udLogin = async () => {
        try {
            const authorization = await uauth.loginWithPopup()
            const userInfo = await uauth.user()
          
            console.log(userInfo)
            console.log(authorization.idToken)
            setLoggedIn(true)

            setTwitterHandle(authorization.idToken.twitter.location)
            setTwitterData(authorization.idToken.twitter)

            setDiscordUsername(authorization.idToken.discord.location)
            setDiscordData(authorization.idToken.discord)

            setTelegramUsername(authorization.idToken.telegram.location)
            setTelegramData(authorization.idToken.telegram)
        } catch (error) {
          console.error(error)
        }
    }

    const progressLogin = (loggedIn,twitterData) => {
        if(loggedIn){
            console.log("Logged in!");
        }

    }

    //console.log("username: ",username);
    //console.log("loggedIn: ",loggedIn);
    progressLogin(loggedIn,twitterData);

    return(
        <div id="login-options-container" className="login-options-container">
            <h2 className="tip">Verified Socials!</h2>
            <body className="login-section">
                <p className="tip"> Login With Unstoppable lets you connect with your users! </p>
                <button id="udlogin" className="udlogin" onClick={udLogin}></button>
                <div className="orDivider"><p> -- --- -- </p></div>
                {hasSocial(twitterHandle) && <TwitterStats twitterData={twitterData}/>}
                {hasSocial(discordUsername) && <DiscordStats socialData={discordData}/>}
                {hasSocial(telegramUsername) && <TelegramStats socialData={telegramData}/>}
                {loggedIn && !hasSocial(twitterHandle) && !hasSocial(discordUsername)  && !hasSocial(telegramUsername) && <h2>No socials given, no problem!</h2>}
            </body>
        </div>
    )
}

export default LoginWithPopup;