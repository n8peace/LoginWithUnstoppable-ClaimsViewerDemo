import UAuth from "@uauth/js"
import React, { useState } from "react";

import "./login-components//stylesheets/LoginWithPopup.css"
import udLogo from "./assets/ud-logo-lockup.svg"
import ClaimsTable from "./login-components/ClaimsTable"

const uauth = new UAuth({
    clientID: "e88e46ce-c3ca-477f-a11b-3dd8742fde92",
    redirectUri: "https://loginwithunstoppable.com",
    scope: "openid wallet email:optional profile:optional social:optional"
  }
)

function safeMakeSocialData(authorization, app){
    let data = {}
    try{
        data["handle"] = authorization.idToken[app].location;
        data["verified"] = authorization.idToken[app].verified;
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

    let [loggedIn, setLoggedIn] = useState(false);
    let [showNone, setShowNone] = useState(true);

    let [domainData, setDomainData] = useState({});
    let [profileData, setProfileData] = useState({});
    let [emailData, setEmailData] = useState({});
    let [socialsData, setSocialsData] = useState({});
    let [verifiedAddressesData, setVerifiedAddressesData] = useState({});

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
            console.log("logged in!")
            console.log("userInfo: ",userInfo)
            console.log("idToken: ",authorization.idToken)

            setLoggedIn(true)
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
            
        } catch (error) {
          console.error(error)
        }
    }

    return(
        <div id="login-options-container" className="login-options-container">
            <img src={udLogo} style={{ height: 100, width: 200, alignSelf: "right"}} alt="udlogo"/>
            <h1>Login Scopes!</h1>
            <div className="login-section">
                <p className="tip"> Login With Unstoppable has a variety of scopes. Try logging in below to check out what your app can get! </p>
                <button id="udlogin" className="udlogin" onClick={udLogin}></button>
                <p> -- --- --- --- --- </p>
                <h3><a href="https://docs.unstoppabledomains.com/login-with-unstoppable/scopes-for-login/#scopes-for-login">Scopes</a></h3><br/>
                <b>Displayed As: </b>Domain Data, UD Profile, Email, Socials, Verified Wallets
                <p> -- --- --- --- ---</p>
                {loggedIn && <ClaimsTable title="Domain Data" showNone={showNone} data={domainData} />}
                {loggedIn && <ClaimsTable title="UD Profile" showNone={showNone} data={profileData} />}
                {loggedIn && <ClaimsTable title="Email" showNone={showNone} data={emailData} />}
                {loggedIn && <ClaimsTable title="Socials" subtitle="Twitter" showSubtitle={true} showNone={showNone} data={socialsData.twitter}/>}
                {loggedIn && <ClaimsTable showTitle={false} subtitle="Telegram" showSubtitle={true} showNone={showNone} data={socialsData.telegram}/>}
                {loggedIn && <ClaimsTable showTitle={false} subtitle="Discord" showSubtitle={true} showNone={showNone} data={socialsData.discord}/>}
                {loggedIn && <ClaimsTable showTitle={false} subtitle="Reddit" showSubtitle={true} showNone={showNone} data={socialsData.reddit}/>}
                {loggedIn && <ClaimsTable showTitle={false} subtitle="YouTube" showSubtitle={true} showNone={showNone} data={socialsData.youtube}/>}
                {loggedIn && <ClaimsTable title="Verified Wallets" showNone={showNone} data={verifiedAddressesData} />}
            </div>
        </div>
    )
}

export default LoginScopesDemo;