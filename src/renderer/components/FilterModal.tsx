import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';

function FilterModal({
  modalVisible,
  setModalVisible,
  columns,
  title,
  setWhere,
  hiddenFields,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  columns: ColumnsType<any>;
  title: string;
  setWhere: (value: string) => void;
  // eslint-disable-next-line react/require-default-props
  hiddenFields?: string[];
}) {
  const [newForm] = useForm();

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
            setWhere(
              Object.keys(values)
                .map((key) => `${key} = '${values[key]}'`)
                .join(' AND '),
            );
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

export default FilterModal;
