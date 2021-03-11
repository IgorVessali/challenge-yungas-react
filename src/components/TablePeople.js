// TableContainer.js
import React, { Fragment } from "react"
import { useTable, useSortBy, useFilters, usePagination } from "react-table"
import { Filter, DefaultColumnFilter } from './filters';
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap"

//Create componet Table
const TablePeople = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 20 },
    defaultColumn: { Filter: DefaultColumnFilter }
  },
  useFilters,
  useSortBy,
  usePagination )
  
  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
  //generates HTML by rendering the table
  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
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
          {page.map(row => {
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
      </Table>
      { pageOptions.length > 1 && 
        <Row style={{ maxWidth: 1000, 
                      margin: "0 auto", 
                      textAlign: "center", 
                      display:'flex'}}>
          <Col md={3}>
            <Button
              color=""
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color=""
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <CustomInput type="select" value={pageSize} onChange={onChangeInSelect}>
              {'>'}
              {[10, 20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </CustomInput>
          </Col>
          <Col md={3}>
            <Button color="" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color=""
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </Col>
        </Row>
      }
    </Fragment>
  )
}

const generateSortingIndicator = column => {
  return column.isSorted ? column.isSortedDesc ? '  ↓'  : '  ↑' : '  ↕'
}

export default TablePeople