import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Typography } from 'antd';

function DataManipulation({
  setWhere,
  handleDelete,
  selectedKeys,
  setFilterModalVisible,
  setNewModalVisible,
  title,
}: {
  setWhere: (value: string) => void;
  handleDelete: () => Promise<void>;
  selectedKeys: never[];
  setFilterModalVisible: (value: boolean) => void;
  setNewModalVisible: (value: boolean) => void;
  title: string;
}) {
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
          Delete
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
              setNewModalVisible(true);
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
