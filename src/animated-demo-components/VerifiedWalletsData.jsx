import "./AnimatedDemo.css"
import React, { useState } from "react";
import ClaimsTable from "../login-components/ClaimsTable"

function VerifiedWalletsData(props){
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
            <h1 className="animated-demo-fade">Verified Wallet Addresses</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                UD supports almost 300 coins and tokens to be set as a crypto address record for a domain. 
                <br/><br/>
                Verified wallet addresses however are special. For an address to be verified, it means the user has signed a challenge message from this wallet proving ownership.
                <br/><br/>
                This is a powerful tool for dapps, enabling features like supporting Login With Unstoppable from a Solana wallet and Solana dApps!
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

export default VerifiedWalletsData;