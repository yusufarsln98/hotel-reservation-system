/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import NewDataModal from '../components/NewDataModal';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'staff';

export default function Staff() {
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
        title="Staff"
        setRefetch={setRefetch}
        table={table}
        tableId="Staff_ID"
      />
      <DataTable
        props={{}}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        rowKey="Staff_ID"
        data={data}
        columns={columns?.map((column) => {
          return column;
        })}
      />
      <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Staff"
        table={table}
        setRefetch={setRefetch}
        hiddenFields={['Staff_ID']}
      />
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Staff"
        setWhere={setWhere}
      />
    </>
  );
}
