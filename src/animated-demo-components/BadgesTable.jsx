import "../login-components/stylesheets/LoginClaims.css"
import TableRow from "../login-components/TableRow"


function buildTableBody(data){
    // There are significantly better ways to do this, but I'm lazy and on a call and multitasking
    let tableRows = [];
    for (var key of Object.keys(data)){
        if(data[key]){
            if (data[key]["logo"].length > 2){ // lazy handle emojis
                tableRows.push(<tr><td><img src={data[key]["logo"]}/></td><td>{key}</td><td>{data[key]["description"]}</td></tr>)
            }else{
                tableRows.push(<tr><td>{data[key]["logo"]}</td><td>{key}</td><td>{data[key]["description"]}</td></tr>)
            }
        }
    }
    return tableRows;
}


function generateResults(showNone,data,title){
    let results = []
    const tableClassName="claims-table"
    if (typeof data !== 'undefined'){
        if (Object.keys(data).length >0){
            results.push(
                <table id={title} className={tableClassName}>
                    <tbody>
                        <tr><th>Logo</th><th>Name</th><th>Description</th></tr>
                        {buildTableBody(data)}
                    </tbody>    
                </table>
            );
        }else{
            results.push(<p>None Given</p>)
        }
    } else{
        results.push(<p>None Given</p>)
    }
    return(results)
}


function BadgesTable(props){
    const { showTitle = true} = props;
    const { showSubtitle = false} = props;
    return(
        <div id="claims-table-wrapper" className="claims-table-wrapper">
            {showTitle && <h1>{props.title}</h1>}
            {showSubtitle && <h3>{props.subtitle}</h3>}
            {generateResults(props.showNone,props.data,props.title)}
        </div>
    )
}

export default BadgesTable;