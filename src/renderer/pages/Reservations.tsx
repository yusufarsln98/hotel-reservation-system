/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Button, Flex, Form, Input, Modal, Tag, message } from 'antd';
import useTableData from '../hooks/useTableData';
import DataTable from '../components/DataTable';
import NewDataModal from '../components/NewDataModal';
import { ApiContext } from '../providers/ApiProvider';
import FilterModal from '../components/FilterModal';
import DataManipulation from '../components/DataManipulation';

const table = 'reservations';

export default function Reservations() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { query } = useContext(ApiContext);
  const [where, setWhere] = useState<string>('');
  const [refetch, setRefetch] = useState(false);
  const { data, columns } = useTableData(table, [], where, refetch);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsRecord, setDetailsRecord] = useState<any>();
  const [detailsForm] = useForm();

  const handlePay = async (record: any) => {
    try {
      const paymentMethodOptions = [
        'Credit Card',
        'Cash',
        'Debit Card',
        'Bank Transfer',
      ];
      // select random payment method
      const res: any = await query(
        `SELECT makePayment(${record.Reservation_ID}, '${
          paymentMethodOptions[
            Math.floor(Math.random() * paymentMethodOptions.length)
          ]
        }')`,
      );
      message.success(JSON.stringify(res.data[0]));
      console.log(res.data[0]);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
    }
  };

  const handleCancel = async (record: any) => {
    try {
      const res: any = await query(
        `SELECT updateReservationToCancelled(${record.Reservation_ID})`,
      );
      message.success(JSON.stringify(res.data[0]));
      console.log(res.data[0]);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      message.error(JSON.stringify(error.response.data));
    }
  };

  const handleActionClick = (record: any) => {
    console.log('Action button clicked for record:', record);
    setDetailsModalVisible(true);
    setDetailsRecord(record);
  };

  const insertDetails = async (values: any) => {
    try {
      const queryText = `INSERT INTO Reservation_Details (Reservation_ID, Detail_ID, Detail_Description) VALUES (${detailsRecord.Reservation_ID}, ${values.Detail_ID}, '${values.Detail_Description}')`;
      console.log('queryText', queryText);
      await query(queryText);
      message.success('Record added');
      setRefetch((prev: any) => !prev);
    } catch (error: any) {
      console.error(error);
      message.error(
        `${error.response.data.code}, ${error.response.data.sqlMessage}`,
      );
    }
  };

  return (
    <>
      <DataManipulation
        setWhere={setWhere}
        selectedKeys={selectedKeys}
        setFilterModalVisible={setFilterModalVisible}
        setAddModalVisible={setAddModalVisible}
        title="Reservations"
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
        columns={columns
          ?.map((column) => {
            if (column.title === 'Payment_Status') {
              return {
                ...column,
                render: (text: any, record: any) =>
                  // 3 possible values: 'Paid', 'Pending', 'Cancelled'
                  // eslint-disable-next-line no-nested-ternary
                  text === 'Paid' ? (
                    <Tag color="green">{text}</Tag>
                  ) : text === 'Cancelled' ? (
                    <Tag color="red">{text}</Tag>
                  ) : (
                    <Flex gap={10}>
                      <Button
                        type="primary"
                        onClick={() => handlePay(record)}
                        size="small"
                      >
                        Pay
                      </Button>
                      <Button
                        danger
                        onClick={() => handleCancel(record)}
                        size="small"
                      >
                        Cancel
                      </Button>
                    </Flex>
                  ),
              };
            }
            return column;
          })
          .concat([
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Button onClick={() => handleActionClick(record)}>
                  Add Details
                </Button>
              ),
            },
          ])}
      />
      <NewDataModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        columns={columns}
        title="New Reservation"
        table={table}
        setRefetch={setRefetch}
        hiddenFields={['Reservation_ID', 'Payment_Status']}
      />
      <FilterModal
        modalVisible={filterModalVisible}
        setModalVisible={setFilterModalVisible}
        columns={columns}
        title="Filter Reservations"
        setWhere={setWhere}
      />
      <Modal
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        title="Add Details"
        onOk={() => {
          detailsForm
            .validateFields()
            // eslint-disable-next-line promise/always-return
            .then((values) => {
              Object.keys(values).forEach((key) => {
                if (!values[key]) {
                  delete values[key];
                }
              });

              insertDetails(values);
              detailsForm.resetFields();
              setDetailsModalVisible(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        {detailsRecord && (
          <Form
            form={detailsForm}
            onFinish={insertDetails}
            initialValues={{ Reservation_ID: detailsRecord?.Reservation_ID }}
            labelCol={{ span: 8 }}
          >
            <Form.Item
              label="Reservation ID"
              name="Reservation_ID"
              rules={[
                { required: true, message: 'Please input Reservation ID!' },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Detail ID"
              name="Detail_ID"
              rules={[{ required: true, message: 'Please input Detail ID!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Detail Description"
              name="Detail_Description"
              rules={[
                { required: true, message: 'Please input Detail Description!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
