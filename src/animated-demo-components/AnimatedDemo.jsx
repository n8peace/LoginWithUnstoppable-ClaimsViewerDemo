import "./AnimatedDemo.css"


import Navbar from "./Navbar";
import ClaimsTable from "../login-components/ClaimsTable"
import React, { useState } from "react";

import DomainData from "./DomainData";
import EmailData from "./EmailData";
import ProfileData from "./ProfileData";
import SocialsData from "./SocialsData";
import VerifiedWalletsData from "./VerifiedWalletsData";
import BadgesData from "./BadgesData";
import BadgesTable from "./BadgesTable";



function AnimatedDemo(props){

    let [showLoading, setShowLoading] = useState(true);
    let [showDomainData,setShowDomainData] = useState(false);
    let [showProfileData,setShowProfileData] = useState(false);
    let [showEmailData,setShowEmailData] = useState(false);
    let [showSocialsData,setShowSocialsData] = useState(false);
    let [showVerifiedWalletsData,setShowVerifiedWalletsData] = useState(false);
    let [showBadgesData, setShowBadgesData] = useState(false);
    let [showSummary, setShowSummary] = useState(false);

    const timeBetweenItems = 2000;

    const doLazyAnimation = () => {
        setTimeout(()=>{
            setShowDomainData(true);
            setShowLoading(false);
        },2000)
    }

    if(showLoading){doLazyAnimation()};
    console.log("Name" ,props.domainData.domainName)

    return(
        <div id="animatedDemo">
            <p> --- --- --- --- --- --- --- --- </p>
            <Navbar 
                showDomainDataHandler={setShowDomainData}
                showProfileDataHandler={setShowProfileData}
                showEmailDataHandler={setShowEmailData}
                showSocialsDataHandler={setShowSocialsData}
                showVerifiedWalletsDataHandler={setShowVerifiedWalletsData}
                showBadgesDataHandler={setShowBadgesData}
                showSummaryHandler={setShowSummary}
            />
            <p> --- --- --- --- --- --- --- --- </p>
            { showLoading && <h1>Get Ready To View Your Results!</h1>} 
            { showDomainData && <DomainData data={props.domainData} timer={timeBetweenItems} currentHandler={setShowDomainData} nextHandler={setShowProfileData}/>}
            { showProfileData && <ProfileData data={props.profileData} timer={timeBetweenItems} currentHandler={setShowProfileData} nextHandler={setShowEmailData} domainName={props.domainData.domainName}/>}
            { showEmailData && <EmailData data={props.emailData} timer={timeBetweenItems} currentHandler={setShowEmailData} nextHandler={setShowSocialsData} domainName={props.domainData.domainName}/>}
            { showSocialsData && <SocialsData data={props.socialsData} timer={timeBetweenItems} currentHandler={setShowSocialsData} nextHandler={setShowVerifiedWalletsData} domainName={props.domainData.domainName}/>}
            { showVerifiedWalletsData && <VerifiedWalletsData data={props.verifiedAddressesData} timer={timeBetweenItems} currentHandler={setShowVerifiedWalletsData} nextHandler={setShowBadgesData} domainName={props.domainData.domainName}/>}
            { showBadgesData && <BadgesData data={props.badgesData} timer={timeBetweenItems} currentHandler={setShowBadgesData} nextHandler={setShowSummary}  domainName={props.domainData.domainName}/>}
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
                    <ClaimsTable title="Verified Wallets" data={props.verifiedAddressesData}/>
                    <BadgesTable title="Badges" data={props.badgesData}/>
                </div>
            }
        </div>
    )

}

export default AnimatedDemo;