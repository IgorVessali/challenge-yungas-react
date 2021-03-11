import React from 'react';
import database  from '../src/database.json'
import Table from '../src/components/Table'
import { SelectColumnFilter } from '../src/components/filters';

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
  <Table columns={columns} data={database} />
  </>
}
export default App;
