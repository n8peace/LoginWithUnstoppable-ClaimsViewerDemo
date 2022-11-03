import "./Navbar.css"


const navigateToSection = (navHandler, allHandlers) =>{
    // First set all sections to False
    for (const index in allHandlers){
        allHandlers[index](false)
    }
    // Now set the one we want
    navHandler(true)
}


function Navbar(props){
    const allHandlers=[
        props.showDomainDataHandler,
        props.showProfileDataHandler,
        props.showEmailDataHandler,
        props.showSocialsDataHandler,
        props.showVerifiedWalletsDataHandler,
        props.showBadgesDataHandler,
        props.showSummaryHandler
    ]
    //allHandlers[2](true);
    //navigateToSection(props.showVerifiedWalletsDataHandler,allHandlers);
    return(
        <div id="navbar">
            <h3>Skip To Section:</h3>
            <button 
                id="domainData" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showDomainDataHandler,allHandlers)}
            >
                Domain
            </button>

            <button 
                id="profileData" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showProfileDataHandler,allHandlers)}
            >
                Profile
            </button>
            
            <button 
                id="emailData" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showEmailDataHandler,allHandlers)}
            >
                Email
            </button>
            
            <button 
                id="socialsData" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showSocialsDataHandler,allHandlers)}
            >
                Socials
            </button>
            
            <button 
                id="verifiedWalletAddresses" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showVerifiedWalletsDataHandler,allHandlers)}
            >
                Verified Wallets
            </button>

            <button
                id="badges"
                className="section-link"
                onClick={()=>navigateToSection(props.showBadgesDataHandler,allHandlers)}
            >
                Badges
            </button>
            
            <button 
                id="summary" 
                className="section-link" 
                onClick={()=>navigateToSection(props.showSummaryHandler,allHandlers)}
            >
                Summary
            </button>
        </div>
    )
}

export default Navbar;