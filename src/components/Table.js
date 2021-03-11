// TableContainer.js
import React from "react"
import { useTable, useSortBy, useFilters } from "react-table"
import { Filter, DefaultColumnFilter } from './filters';

//Create componet Table
const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter }
  },
  useFilters,
  useSortBy, )
  //generates HTML by rendering the table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                <div {...column.getSortByToggleProps()}>
                  {column.render("Header")}
                  {generateSortingIndicator(column)}
                </div>
                <Filter column={column} />
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const generateSortingIndicator = column => {
  return column.isSorted ? column.isSortedDesc ? '  ↓'  : '  ↑' : '  ↕'
}

export default Table