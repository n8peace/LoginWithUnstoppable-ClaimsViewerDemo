import "./AnimatedDemo.css"
import React, { useState } from "react";
import ClaimsTable from "../login-components/ClaimsTable"

function EmailData(props){
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
            <h1 className="animated-demo-fade">Email Data</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                Email with a wallet? That's where UD comes in! Users can optionally choose to associate an email with their UD account.
                UD has an email forwarding system that gives users the ability to send and receive email behind an anonymous address. 
                In this way, users can protect their data and safety while apps still have a way to correspond with their users. A true win-win! 
                <br/><br/>
                The email masked email is of format <i>domain.tld@ud.me</i> . Through Login With Unstoppable the application will get a unique machine version 
                of this address for correspondence with the user, as well as confirmation that this email has been verified by the user. 
            </p></div>}
            { showDetails && 
                <div className="animated-demo-slideup">
                    <h2>Here are the results for {props.domainName}</h2>
                    <ClaimsTable showTitle={false} data={props.data} />
                    <button className="next-button" onClick={handleNextClick}>Next</button>
                </div>
            }
        </div>
    )
}
export default EmailData;