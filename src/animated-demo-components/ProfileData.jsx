import "./AnimatedDemo.css"
import React, { useState } from "react";
import ClaimsTable from "../login-components/ClaimsTable"

function ProfileData(props){
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
            <h1 className="animated-demo-fade">Profile Data</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                Profile Data is set by the user in their <i>ud.me</i> profile page. This serves as a point of social identity for Web3. Some of this data is private and the user optionally chooses to share with apps.
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

export default ProfileData;