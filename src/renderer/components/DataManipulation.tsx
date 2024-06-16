import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Typography, message } from 'antd';
import { useContext } from 'react';
import { ApiContext } from '../providers/ApiProvider';

function DataManipulation({
  setWhere,
  selectedKeys,
  setFilterModalVisible,
  setAddModalVisible,
  title,
  setRefetch,
  table,
  tableId,
}: {
  setWhere: (value: string) => void;
  selectedKeys: never[];
  setFilterModalVisible: (value: boolean) => void;
  setAddModalVisible: (value: boolean) => void;
  title: string;
  setRefetch: (value: any) => void;
  table: string;
  tableId: string;
}) {
  const { query } = useContext(ApiContext);

  const handleDelete = async () => {
    try {
      const res: any = await query(
        `DELETE FROM ${table} WHERE ${tableId} IN (${selectedKeys.join(',')})`,
      );
      message.success(JSON.stringify(res.data));
      console.log(res.data);
      setRefetch((prev: any) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
      console.error(error.response.data);
    }
  };

  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      <Flex gap={10}>
        <Input.Search
          prefix="WHERE"
          placeholder='e.g. "Payment_Status" = "Paid"'
          onSearch={(value) => {
            setWhere(value);
          }}
        />
      </Flex>
      <Flex
        gap={10}
        style={{ marginTop: 10 }}
        align="center"
        justify="space-between"
      >
        <Button
          danger
          onClick={handleDelete}
          disabled={selectedKeys.length === 0}
        >
          Delete{' '}
          {selectedKeys.length > 0 ? `(${selectedKeys.length}) items` : ''}
        </Button>
        <Flex gap={20}>
          <Flex gap={10}>
            <Button
              onClick={() => {
                setFilterModalVisible(true);
              }}
            >
              Filter
            </Button>
            <Button
              onClick={() => {
                setWhere('');
              }}
              type="dashed"
            >
              Clear Filters
            </Button>
          </Flex>
          <Button
            type="primary"
            onClick={() => {
              setAddModalVisible(true);
            }}
            icon={<PlusCircleOutlined />}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default DataManipulation;
