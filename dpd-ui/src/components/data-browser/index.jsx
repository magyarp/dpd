import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import ReactTable from "react-table-v6";
import checkboxHOC from "react-table-v6/lib/hoc/selectTable";
import { Button } from '@material-ui/core';
import { useStores } from '../../stores/RootStore';
import * as Texts from '../../constants/texts';

import 'react-table-v6/react-table.css'

const DataBrowser = observer(() => {

  const { getPersonalData, depresonalizeData, personalData } = useStores();

  const CheckboxTable = checkboxHOC(ReactTable);

  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [selection, setSelection] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getPersonalData(0, pageSize, setLoading);
  }, [getPersonalData, pageSize, setLoading])

  const columns = [
    {
      Header: Texts.name,
      accessor: 'name',
    },
    {
      Header: Texts.placeOfBirth,
      accessor: 'placeOfBirth'
    },
    {
      Header: Texts.dateOfBirth,
      accessor: 'dateOfBirth'
    },
    {
      Header: Texts.motherName,
      accessor: 'motherName'
    },
    {
      Header: Texts.tajNumber,
      accessor: 'tajNumber'
    },
    {
      Header: Texts.taxIdentifier,
      accessor: 'taxIdentifier'
    },
    {
      Header: Texts.emailAddress,
      accessor: 'emailAddress'
    },
    {
      Header: Texts.phoneNumber,
      accessor: 'phoneNumbers',
      Cell: row => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {row.value.map(phoneNumber => {
            return <div>{phoneNumber}</div>
          })}
        </div>
      )
    }
  ];

  const toggleSelection = (key, shift, row) => {
    let selection = [...selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(key);
    }
    setSelection({ selection });
  };

  const toggleAll = () => {
    const newSelectAll = selectAll ? false : true;
    const newSelection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    setSelectAll(newSelectAll);
    setSelection(newSelection);
  }

  const isSelected = key => {
    return selection.includes(key);
  };

  const onDepersonalize = () => {

  }

  const checkboxProps = {
    selectAll,
    isSelected,
    toggleSelection,
    toggleAll,
    selectType: "checkbox",
    getTrProps: (s, r) => {
      const selected = r ? isSelected(r.original._id) : false
      return {
        style: {
          backgroundColor: selected ? "lightgreen" : "inherit"
        }
      }
    }
  };

  let checkboxTable;

  return <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={onDepersonalize}
      style={{ marginBottom: "10px" }}
    >
      Személyes adatok törlése
      </Button>
    <CheckboxTable
      style={{ width: "100%" }}
      ref={r => (checkboxTable = r)}
      data={personalData}
      columns={columns}
      className="-striped -highlight"
      onPageChange={(pageIndex) => getPersonalData(pageIndex, pageSize)}
      onPageSizeChange={(pageSize, pageIndex) => {
        setPageSize(pageSize);
        getPersonalData(pageIndex, pageSize);
      }}
      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
      defaultPageSize={pageSize}
      loading={loading}
      {...checkboxProps}
    />
  </div>
})

export default DataBrowser;