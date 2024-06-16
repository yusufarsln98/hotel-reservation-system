import { useContext } from 'react';
import {
  Collapse,
  Button,
  Form,
  Input,
  Typography,
  Select,
  message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ApiContext } from '../providers/ApiProvider';

export default function WalkInReservation() {
  const { query } = useContext(ApiContext);
  const [form] = useForm();

  // create transaction
  const onFinish = async (values: any) => {
    try {
      const queryText = `CALL WalkInReservation(
        '${values.name}',
        '${values.email}',
        '${values.phone}',
        '${values.address}',
        ${values.roomNumber},
        '${values.checkInDate}',
        '${values.checkOutDate}',
        ${values.numberOfGuests},
        '${values.paymentMethod}'
      )`;

      console.log('queryText', queryText);

      await query(queryText);
      // form.resetFields();
      message.success('Transaction created successfully');
    } catch (error: any) {
      console.log(error);
      message.error(JSON.stringify(error.response.data));
    }
  };

  const items = [
    {
      key: 'guest_information',
      label: 'Guest Information',
      children: (
        <>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input placeholder="johndoe@mail.com" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Phone is required' }]}
          >
            <Input placeholder="1234567890" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input placeholder="123 Main St." />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'reservation_information',
      label: 'Reservation Information',
      children: (
        <>
          <Form.Item
            label="Room Number"
            name="roomNumber"
            rules={[{ required: true, message: 'Room Number is required' }]}
          >
            <Input placeholder="101" />
          </Form.Item>
          <Form.Item
            label="Check-in Date"
            name="checkInDate"
            rules={[{ required: true, message: 'Check-in Date is required' }]}
          >
            <Input placeholder="2024-06-15" />
          </Form.Item>
          <Form.Item
            label="Check-out Date"
            name="checkOutDate"
            rules={[{ required: true, message: 'Check-out Date is required' }]}
          >
            <Input placeholder="2024-06-17" />
          </Form.Item>
          <Form.Item
            label="Number of Guests"
            name="numberOfGuests"
            rules={[
              { required: true, message: 'Number of Guests is required' },
            ]}
          >
            <Input placeholder="1" />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'payment_information',
      label: 'Payment Information',
      children: (
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Payment Method is required' }]}
          initialValue="Credit Card"
        >
          <Select>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
            <Select.Option value="Debit Card">Debit Card</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={2}>Walk-in Reservation</Typography.Title>
      <Form form={form} onFinish={onFinish}>
        <Collapse items={items} />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: 20,
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
