const RequestTable = ({request}) => {
    return (
        <div className="request-details">
            <h4>{request.orgName}</h4>
            <p><strong>orgEmail: </strong>{request.orgEmail}</p>
        </div>
    )
}

export default RequestTable