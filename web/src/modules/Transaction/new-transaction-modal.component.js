import { Modal, Form, Input, Radio, Select } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import transactionCategoryQuery, {
  TRANSACTION_CATEGORY_QUERY_NAME,
} from '../../shared/requests/transaction-category/transactionCategoryQuery';
import transactionTypeQuery, {
  TRANSACTION_TYPE_QUERY_NAME,
} from '../../shared/requests/transaction-type/transactionTypeQuery';

const mapRadioButtonOptions = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((d) => {
    return { label: d.name, value: d.id };
  });
};

const mapSelectInputOptions = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((d) => {
    return (
      <Select.Option value={d.id} key={d.id}>
        {d.name}
      </Select.Option>
    );
  });
};

const NewTransactionModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const { data: categories } = useQuery(
    TRANSACTION_CATEGORY_QUERY_NAME,
    transactionCategoryQuery
  );

  const { data: types } = useQuery(
    TRANSACTION_TYPE_QUERY_NAME,
    transactionTypeQuery
  );

  useEffect(() => {
    if (!visible) form.resetFields();
    else {
      form.setFieldsValue({
        typeId: 1,
        categoryId: 1,
      });
    }
  }, [visible, form]);

  const onAmountChange = useCallback(
    (e) => {
      if (e.target.value < 0) {
        form.setFieldsValue({
          amount: -e.target.value,
        });
      }
    },
    [form]
  );

  const onOkHandler = useCallback(async () => {
    const formValues = await form.validateFields();
    onSubmit(formValues);
  }, [form, onSubmit]);

  return (
    <Modal
      title="Add new transaction"
      onOk={onOkHandler}
      onCancel={onCancel}
      visible={visible}
    >
      <Form form={form}>
        <Form.Item name="description">
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: 'Amount is required',
            },
          ]}
        >
          <Input
            placeholder="Amount"
            type="number"
            inputMode="decimal"
            onChange={onAmountChange}
          />
        </Form.Item>

        <Form.Item name="typeId">
          <Radio.Group
            options={mapRadioButtonOptions(types)}
            optionType="button"
          />
        </Form.Item>

        <Form.Item name="categoryId">
          <Select>{mapSelectInputOptions(categories)}</Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTransactionModal;
