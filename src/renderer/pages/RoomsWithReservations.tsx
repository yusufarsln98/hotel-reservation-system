/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'RoomsWithReservations';

export default function RoomsWithReservations() {
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
        title="Rooms With Reservations"
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
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter RoomsWithReservations"
        setWhere={setWhere}
      />
    </>
  );
}
