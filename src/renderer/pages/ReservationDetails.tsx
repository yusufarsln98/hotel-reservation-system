/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import DataManipulation from '../components/DataManipulation';

const table = 'Reservation_Details';

export default function ReservationDetails() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [where, setWhere] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { data, columns } = useTableData(table, [], where, refetch);
  const [, setAddModalVisible] = useState(false);
  const [, setFilterModalVisible] = useState(false);

  return (
    <>
      <DataManipulation
        setWhere={setWhere}
        selectedKeys={selectedKeys}
        setFilterModalVisible={setFilterModalVisible}
        setAddModalVisible={setAddModalVisible}
        title="Reservation Details"
        setRefetch={setRefetch}
        table={table}
        tableId="Reservation_ID"
      />
      <DataTable
        props={{}}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        rowKey="Reservation_ID"
        data={data}
        columns={columns?.map((column) => {
          return column;
        })}
      />
      {/* <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Guest"
        table={table}
        setRefetch={setRefetch}
      /> */}
      {/* <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Guests"
        setWhere={setWhere}
      /> */}
    </>
  );
}
