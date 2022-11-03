import BadgesTable from "./BadgesTable";
import React, { useState } from "react";
function BadgesData(props){
    const [showDescription, setShowDescription] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const delayBeforeDescription = 2000;
    setTimeout(()=>{setShowDescription(true)},delayBeforeDescription)
    setTimeout(()=>{setShowDetails(true)},delayBeforeDescription+props.timer)
    
    const handleNextClick = () => {
        props.currentHandler(false)
        props.nextHandler(true)
    }

    console.log(props.domainName)
    return(
        <div>
            <h1 className="animated-demo-fade">Badges</h1>
            { showDescription && <div className="description"><p className="animated-demo-slideup">
                Badges are...
            </p></div>}
            { showDetails && 
                <div className="animated-demo-slideup">
                    <h2>Here are the results for {props.domainName}</h2>
                    <BadgesTable title="Badges" data={props.data} showTitle={false}/>
                    <button className="next-button" onClick={handleNextClick}>Next</button>
                </div>
            }
        </div>
    )
}
export default BadgesData;