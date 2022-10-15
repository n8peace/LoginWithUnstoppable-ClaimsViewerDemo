import "./AnimatedDemo.css"
import React, { useState } from "react";
import ClaimsTable from "../login-components/ClaimsTable"

function SocialsData(props){
    const [showDescription, setShowDescription] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const delayBeforeDescription = 2000;
    setTimeout(()=>{setShowDescription(true)},delayBeforeDescription)
    setTimeout(()=>{setShowDetails(true)},delayBeforeDescription+props.timer)
    
    const handleNextClick = () => {
        props.currentHandler(false)
        props.nextHandler(true)
    }

    return(
        <div>
            <h1 className="animated-demo-fade">Socials Data</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                Users can also choose to share socials with an application. These are all set by the user in their ud.me profile.
                <br/><br/>
                Users can also choose to verify their accounts, to give extra assurance that social handle provided with their domain is in fact theirs!
                <br/><br/>
                Users who choose to verify their Twitter can also share with apps awesome stats like their follower counts. Imagine the customized experience you can offer these users in your application!
            </p></div>}
            { showDetails && 
                <div className="animated-demo-slideup">
                    <h2>Here are the results for {props.domainName}</h2>
                    <ClaimsTable showTitle={false} subtitle="Twitter" showSubtitle={true} data={props.data.twitter}/>
                    <ClaimsTable showTitle={false} subtitle="Telegram" showSubtitle={true} data={props.data.telegram}/>
                    <ClaimsTable showTitle={false} subtitle="Discord" showSubtitle={true} data={props.data.discord}/>
                    <ClaimsTable showTitle={false} subtitle="Reddit" showSubtitle={true} data={props.data.reddit}/>
                    <ClaimsTable showTitle={false} subtitle="YouTube" showSubtitle={true} data={props.data.youtube}/>
                    <button className="next-button" onClick={handleNextClick}>Next</button>
                </div>
            }
        </div>
    )
}

export default SocialsData;