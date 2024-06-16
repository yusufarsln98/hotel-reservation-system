/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import NewDataModal from '../components/NewDataModal';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'PriceChangeLog';

export default function PriceChangeLog() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [where, setWhere] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { data, columns } = useTableData(table, [], where, refetch);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <>
      <DataManipulation
        setWhere={setWhere}
        selectedKeys={selectedKeys}
        setFilterModalVisible={setFilterModalVisible}
        setAddModalVisible={setAddModalVisible}
        title="Price Change Log"
        setRefetch={setRefetch}
        table={table}
        tableId="Log_ID"
      />
      <DataTable
        props={{}}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        rowKey="Log_ID"
        data={data}
        columns={columns?.map((column) => {
          return column;
        })}
      />
      <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Price Change Log"
        table={table}
        setRefetch={setRefetch}
        hiddenFields={['Log_ID']}
      />
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Price Change Log"
        setWhere={setWhere}
      />
    </>
  );
}
