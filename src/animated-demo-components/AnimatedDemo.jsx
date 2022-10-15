import "./AnimatedDemo.css"

import ClaimsTable from "../login-components/ClaimsTable"
import React, { useState } from "react";

import DomainData from "./DomainData";
import EmailData from "./EmailData";
import ProfileData from "./ProfileData";
import SocialsData from "./SocialsData";
import VerifiedWalletsData from "./VerifiedWalletsData";



function AnimatedDemo(props){

    let [showLoading, setShowLoading] = useState(true);
    let [showDomainData,setShowDomainData] = useState(false);
    let [showProfileData,setShowProfileData] = useState(false);
    let [showEmailData,setShowEmailData] = useState(false);
    let [showSocialsData,setShowSocialsData] = useState(false);
    let [showVerifiedWalletsData,setShowVerifiedWalletsData] = useState(false);
    let [showSummary, setShowSummary] = useState(false);

    const timeBetweenItems = 4000;

    const doLazyAnimation = () => {
        setTimeout(()=>{
            setShowDomainData(true);
            setShowLoading(false);
        },2000)
    }

    if(showLoading){doLazyAnimation()};

    return(
        <div id="animatedDemo">
            { showLoading && <h1>Get Ready To View Your Results!</h1>} 
            { showDomainData && <DomainData data={props.domainData} timer={timeBetweenItems} currentHandler={setShowDomainData} nextHandler={setShowProfileData}/>}
            { showProfileData && <ProfileData data={props.profileData} timer={timeBetweenItems} currentHandler={setShowProfileData} nextHandler={setShowEmailData} domainName={props.domainData.domainName}/>}
            { showEmailData && <EmailData data={props.emailData} timer={timeBetweenItems} currentHandler={setShowEmailData} nextHandler={setShowSocialsData} domainName={props.domainData.domainName}/>}
            { showSocialsData && <SocialsData data={props.socialsData} timer={timeBetweenItems} currentHandler={setShowSocialsData} nextHandler={setShowVerifiedWalletsData} domainName={props.domainData.domainName}/>}
            { showVerifiedWalletsData && <VerifiedWalletsData data={props.verifiedAddressesData} timer={timeBetweenItems} currentHandler={setShowVerifiedWalletsData} nextHandler={setShowSummary} domainName={props.domainData.domainName}/>}
            { showSummary &&
                <div id="summary">
                    <h1>Summary for {props.domainData.domainName}</h1>
                    <ClaimsTable title="Domain Data" data={props.domainData} />
                    <ClaimsTable title="UD Profile" data={props.profileData} />
                    <ClaimsTable title="Email"  data={props.emailData} />
                    <ClaimsTable title="Socials" subtitle="Twitter" showSubtitle={true} data={props.socialsData.twitter}/>
                    <ClaimsTable showTitle={false} subtitle="Telegram" showSubtitle={true} data={props.socialsData.telegram}/>
                    <ClaimsTable showTitle={false} subtitle="Discord" showSubtitle={true} data={props.socialsData.discord}/>
                    <ClaimsTable showTitle={false} subtitle="Reddit" showSubtitle={true} data={props.socialsData.reddit}/>
                    <ClaimsTable showTitle={false} subtitle="YouTube" showSubtitle={true} data={props.socialsData.youtube}/>
                    <ClaimsTable title="Verified Wallets" data={props.verifiedAddressesData} />
                </div>
            }
        </div>
    )

    /*
    return(
        <div id="animatedDemo">
            {showDomainData && <ClaimsTable title="Domain Data" showNone={showNone} data={domainData} />}
            {showProfileData && <ClaimsTable title="UD Profile" showNone={showNone} data={profileData} />}
            {showEmailData && <ClaimsTable title="Email" showNone={showNone} data={emailData} />}
            {showSocialsData && <ClaimsTable title="Socials" subtitle="Twitter" showSubtitle={true} showNone={showNone} data={socialsData.twitter}/>}
            {showSocialsData && <ClaimsTable showTitle={false} subtitle="Telegram" showSubtitle={true} showNone={showNone} data={socialsData.telegram}/>}
            {showSocialsData && <ClaimsTable showTitle={false} subtitle="Discord" showSubtitle={true} showNone={showNone} data={socialsData.discord}/>}
            {showSocialsData && <ClaimsTable showTitle={false} subtitle="Reddit" showSubtitle={true} showNone={showNone} data={socialsData.reddit}/>}
            {showSocialsData && <ClaimsTable showTitle={false} subtitle="YouTube" showSubtitle={true} showNone={showNone} data={socialsData.youtube}/>}
            {showVerifiedWalletsData && <ClaimsTable title="Verified Wallets" showNone={showNone} data={verifiedAddressesData} />}
        </div>
    )
    */
}

export default AnimatedDemo;