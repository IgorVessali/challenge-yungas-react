import React from 'react';
import database  from '../src/database.json'
import TablePeople from '../src/components/TablePeople'
import { SelectColumnFilter } from '../src/components/filters';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  ]

//Render a Table
function App() {
  return <>

      <h1>LIST OF PEOPLES</h1>
      <TablePeople columns={columns} data={database} />
  </>
}
export default App;
