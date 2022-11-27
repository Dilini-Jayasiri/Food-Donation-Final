import React,{useState,useEffect} from "react";
import BootsrapTable from 'react-bootstrap-table-next';

function AcceptPage() {

const [don,setDon] = useState([]);

  const columns = [
    {datafield:'id',text:'Donation ID'},
    {datafield:'donorName',text:'Donor Name'},
    {datafield:'email',text:'Email'},
    {datafield:'phone',text:'Contact No'},
    {datafield:'location',text:'Location'},
    {datafield:'quantity',text:'No of Packets'},
    {datafield:'status',text:'Status'}
  ]

  useEffect(() =>{
    const fetchRequests = async () => {
      const response = await fetch('/reservedDon');
      const json = await response.json()

      if (response.ok) {
        setDon(json)
      }
    }
    fetchRequests()
  }, [])

  return(
    <div>
      <BootsrapTable keyField="id" columns={columns} data={don}/>
        
     
    </div>
  )
}
export default AcceptPage;

   
        
        
        


