/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'CurrentGuests';

export default function CurrentGuests() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [where, setWhere] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { data, columns } = useTableData(table, [], where, refetch);
  const [, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <>
      <DataManipulation
        setWhere={setWhere}
        selectedKeys={selectedKeys}
        setFilterModalVisible={setFilterModalVisible}
        setAddModalVisible={setAddModalVisible}
        title="Current Guests"
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
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter CurrentGuests"
        setWhere={setWhere}
      />
    </>
  );
}
