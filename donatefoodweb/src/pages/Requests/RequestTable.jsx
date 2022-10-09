import React, { useState,useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function RequestTable() {
const [requests,setRequests] = useState([]);

const columns = [
    {dataField:'orgName',text:'Organization Name',sort:true,filter: textFilter()},
    {dataField:'orgType',text:'Organization Type'},
    {dataField:'city',text:'City',sort:true},
    {dataField:'phone',text:'Contact Number'},
    {dataField:'orgEmail',text:'Organization Email'},
    {dataField:'quantity',text:'Needed Food Parcels',sort:true}, 
]

const pagination = paginatorFactory({
    page: 1,
    sizePerPage : 5,
    lastPageText : '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
        console.log('page',page);
        console.log('sizePerPage',sizePerPage);
    },
    onSizePerPageChange: function (page,sizePerPage){
        console.log('page',page);
        console.log('sizePerPage',sizePerPage);
    }
});

useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('/requests');
      const json = await response.json()

      if (response.ok) {
        setRequests(json)
      }
    }
    fetchRequests()
  }, [])
 

  return <div class="mx-auto my">
    <BootstrapTable 
    bootstrap4
    pagination={pagination}
    filter = {filterFactory()}
     keyField='request._id' columns={columns} data={requests}/>
    {/* <table>
        <tr>
            {/* <th>ID</th> */}
            {/* <th>Organization Name</th>
        <th>Organization Type</th>
        <th>City</th>
        <th>Contact Number</th>
        <th>Email</th>
        <th>Needed Food Parcels</th>
        </tr> */}
        {/* {
           requests && requests.length > 0 ?
           requests.map(request => 
   
   <tr>

        {/* <td>{request.id}</td> */}
       {/* </div>  <td>{request.orgName}</td>
         <td>{request.orgType}</td>
         <td>{request.city}</td>
         <td>{request.phone}</td>
         <td>{request.orgEmail}</td>
         <td>{request.quantity}</td>
    </tr>
   )
   :'Loading'
           }
    
    </table>  */}
     
    
    </div>
        }

export default RequestTable
