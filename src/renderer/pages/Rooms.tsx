/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import {
  CheckCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import { Flex, message } from 'antd';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import NewDataModal from '../components/NewDataModal';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';
import { ApiContext } from '../providers/ApiProvider';

const table = 'rooms';

export default function Rooms() {
  const { query } = useContext(ApiContext);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [where, setWhere] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { data, columns } = useTableData(table, [], where, refetch);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const increasePrice = async (record: any) => {
    try {
      const res: any = await query(
        `SELECT updateRoomPrice(${record.Room_Number}, ${record.Price * 1.1})`,
      );
      console.log(res.data[0]);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
    }
  };

  const decreasePrice = async (record: any) => {
    try {
      const res: any = await query(
        `SELECT updateRoomPrice(${record.Room_Number}, ${record.Price * 0.9})`,
      );
      console.log(res.data[0]);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
    }
  };

  // CREATE FUNCTION updateRoomStatusToAvailable (room_num INT) RETURNS VARCHAR(255)
  const markAsAvailable = async (record: any) => {
    try {
      const res: any = await query(
        `SELECT updateRoomStatusToAvailable(${record.Room_Number})`,
      );
      console.log(res.data[0]);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
    }
  };

  return (
    <>
      <DataManipulation
        setWhere={setWhere}
        selectedKeys={selectedKeys}
        setFilterModalVisible={setFilterModalVisible}
        setAddModalVisible={setAddModalVisible}
        title="Rooms"
        setRefetch={setRefetch}
        table={table}
        tableId="Room_Number"
      />
      <DataTable
        props={{}}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        rowKey="Room_Number"
        data={data}
        columns={columns?.map((column) => {
          if (column.title === 'Price') {
            return {
              ...column,
              render: (text, record) => (
                <Flex gap={10}>
                  <span>{text}</span>
                  <UpCircleOutlined
                    title="Increase Price by 10%"
                    style={{ marginLeft: 10 }}
                    onClick={() => increasePrice(record)}
                  />
                  <DownCircleOutlined
                    title="Decrease Price by 10%"
                    onClick={() => decreasePrice(record)}
                  />
                </Flex>
              ),
            };
          }
          // title status ise, Mainenance durumunu renklendir
          if (column.title === 'Status') {
            return {
              ...column,
              render: (text, record) => {
                if (text === 'Maintenance') {
                  return (
                    <Flex gap={10}>
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        {text}
                      </span>
                      <CheckCircleOutlined
                        title="Mark as Available"
                        onClick={() => markAsAvailable(record)}
                      />
                    </Flex>
                  );
                }
                return <span>{text}</span>;
              },
            };
          }

          return column;
        })}
      />
      <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Room"
        table={table}
        setRefetch={setRefetch}
      />
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Rooms"
        setWhere={setWhere}
      />
    </>
  );
}
