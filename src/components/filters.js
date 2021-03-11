import React from 'react';
import { Input, CustomInput } from 'reactstrap';

//A filter base
export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

//Creates an input to filter the informed column
export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input value={filterValue || ''} onChange={(e) => {
      setFilter(e.target.value || undefined);}}
      placeholder='search here ...'
    />
  );
};

//Creates an select to filter the informed column
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => { 
    const options = new Set();
    //Filters the options that will be available in the select
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    //builds select
    <CustomInput id='custom-select' type='select' value={filterValue} onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};