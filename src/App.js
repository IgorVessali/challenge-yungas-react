import React, { useState} from 'react';
import database  from '../src/database.json'
import TablePeople from '../src/components/TablePeople'
import { SelectColumnFilter } from '../src/components/filters';
import Modal from "../src/components/Modal"
import { Button } from 'reactstrap';
//Create the Columns  
const columns = [
    {
      Header: "First Name",
      accessor: "name.first",
    },
    {
      Header: "Last Name",
      accessor: "name.last",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "City",
      accessor: "location.city",
    },
    {
      Header: "State",
      accessor: "location.state",
    },
    {
      Header: "Region",
      accessor: "location.region",
      Filter: SelectColumnFilter,
      filter: 'equals'
    },
    {
      width: 300,
      Header: "Actions",
      accessor: "location.postcode",
      disableFilters: true,
      Cell: row => {      
        const [isModalVisible, setIsModalVisible] = useState(false);
        console.log(row.row.original);
        let {name} = row.row.original
        console.log(name.first)
        return (  
          <div className = 'App'>
              <Button color="primary" onClick={() => setIsModalVisible(true)}>View</Button>
              {isModalVisible ? (
                <Modal title="DETAIL OF PEOPLE" onClose={() => setIsModalVisible(false)}>
                  <div className='data'>
                    <div>
                      <p><b>Name:</b> {row.row.original.name.first} {row.row.original.name.last}</p>
                      <p><b>Gender:</b> {row.row.original.gender} </p>
                    </div>
                    <div className='group'>
                      <div >
                        <h2 className='green'>Location</h2>
                        <p><b>Street:</b> {row.row.original.location.street} </p>
                        <p><b>City:</b> {row.row.original.location.city} </p>
                        <p><b>State:</b> {row.row.original.location.state} </p>
                        <p><b>Region:</b> {row.row.original.location.Region} </p>
                      </div>
                      <div className='block'>
                        <h2 className='green'>Contact</h2>    
                        <p><b>E-mail:</b> {row.row.original.email} </p>
                        <p><b>Phone:</b> {row.row.original.phone} </p>
                        <p><b>Cell:</b> {row.row.original.cell} </p>
                      </div>
                    </div>
                  </div>
                </Modal>
              ) :null}
          </div>
        ) 
      }
    },
  ]

//Render a Table
function App() {
  return <>
    <div className='wrapper'>
      <h1 color>LIST OF PEOPLES</h1>
      <TablePeople columns={columns} data={database} />
    </div>
  </>
}
export default App;
