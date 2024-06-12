import { Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { ApiContext } from '../providers/ApiProvider';

function NewDataModal({
  modalVisible,
  setModalVisible,
  columns,
  title,
  tableName,
  setRefetch,
  hiddenFields,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  columns: ColumnsType<any>;
  title: string;
  tableName: string;
  setRefetch: (value: boolean) => void;
  // eslint-disable-next-line react/require-default-props
  hiddenFields?: string[];
}) {
  const { query } = useContext(ApiContext);
  const [newForm] = useForm();
  const newRecord = async (values: typeof columns) => {
    try {
      const queryText = `INSERT INTO ${tableName} (${Object.keys(values).join(
        ', ',
      )}) VALUES (${Object.values(values)
        .map((value) => (typeof value === 'string' ? `"${value}"` : value))
        .join(', ')})`;
      console.log('queryText', queryText);
      await query(queryText);
      message.success('Record added');
      setRefetch((prev) => !prev);
    } catch (error: any) {
      console.error(error);
      message.error(
        `${error.response.data.code}, ${error.response.data.sqlMessage}`,
      );
    }
  };

  return (
    <Modal
      title={title}
      open={modalVisible}
      onOk={() => {
        // validate the form
        newForm
          .validateFields()
          // eslint-disable-next-line promise/always-return
          .then((values) => {
            // remove empty values
            Object.keys(values).forEach((key) => {
              if (!values[key]) {
                delete values[key];
              }
            });

            newRecord(values);
            newForm.resetFields();
            setModalVisible(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
      onCancel={() => {
        newForm.resetFields();
        setModalVisible(false);
      }}
    >
      <Form form={newForm} name="new" labelCol={{ span: 8 }}>
        {columns
          .filter((column) => !hiddenFields?.includes(column.title as string))
          .map((column) => {
            return (
              <Form.Item
                key={column.key}
                label={column.title as string}
                name={column.title as string}
              >
                <Input placeholder={column.title as string} />
              </Form.Item>
            );
          })}
      </Form>
    </Modal>
  );
}

export default NewDataModal;
