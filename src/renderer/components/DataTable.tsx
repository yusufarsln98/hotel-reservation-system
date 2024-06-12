/* eslint-disable react/jsx-props-no-spreading */
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

function DataTable({
  columns,
  data,
  rowKey,
  selectedKeys,
  setSelectedKeys,
  props,
}: {
  columns: ColumnsType<any>;
  data: any[];
  rowKey: string;
  selectedKeys: any[];
  setSelectedKeys: (value: any) => void;
  props: TableProps<any>;
}) {
  return (
    <Table
      {...props}
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      style={{ marginTop: 20 }}
      pagination={{ pageSize: 12 }}
      bordered
      size="small"
      scroll={{ x: 'max-content' }}
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: (keys) => setSelectedKeys(keys),
      }}
    />
  );
}

export default DataTable;
