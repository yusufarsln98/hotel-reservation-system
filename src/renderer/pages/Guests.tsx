/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import NewDataModal from '../components/NewDataModal';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'guests';

export default function Guests() {
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
        title="Guests"
        setRefetch={setRefetch}
        table={table}
        tableId="Guest_ID"
      />
      <DataTable
        props={{}}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        rowKey="Guest_ID"
        data={data}
        columns={columns?.map((column) => {
          return column;
        })}
      />
      <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Guest"
        table={table}
        setRefetch={setRefetch}
        hiddenFields={['Guest_ID']}
      />
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Guests"
        setWhere={setWhere}
      />
    </>
  );
}
