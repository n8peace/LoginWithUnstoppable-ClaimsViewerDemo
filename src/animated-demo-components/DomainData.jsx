import "./AnimatedDemo.css"
import React, { useState } from "react";
import ClaimsTable from "../login-components/ClaimsTable"
function DomainData(props){
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
            <h1 className="animated-demo-fade">Domain Data</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                Domain data consists entirely of on-chain data configured by the user on the domain. 
                Here we are only requesting a few pieces of on-chain data. By using Domain Resolution, even more on-chain data can be found!
            </p></div>}
            { showDetails && 
                <div className="animated-demo-slideup">
                    <h2>Here are the results for {props.data.domainName}</h2>
                    <ClaimsTable showTitle={false} data={props.data} />
                    <button className="next-button" onClick={handleNextClick}>Next</button>
                </div>
            }
        </div>
    )
}

export default DomainData;