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
                With Badges, Unstoppable Domain owners can now showcase a few of their favorite Web3 wallet achievements
                such as what NFTs projects they’re involved in, how many domains they’ve collected, or cryptos they hold, 
                directly on their public and shareable ud.me profiles pages like <a href="http://ud.me/itsjimbob.nft" target="_blank" rel="noopener noreferrer">this.</a>
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