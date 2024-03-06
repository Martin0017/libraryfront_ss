import { Form, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateAuthorForm = (props) => {
  const { onFinishUpdate, selectedRow, form2, running } = props;

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
  };

  useEffect(() => {
    form2.setFieldsValue({
      nameAuthor: selectedRow.nameAuthor,
      lastnameAuthor: selectedRow.lastnameAuthor,
    });
  }, [selectedRow, form2]);

  return (
    <Form
      {...formItemLayout}
      form={form2}
      name="update"
      onFinish={handleFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="nameAuthor"
        label="Nombre"
        initialValue={selectedRow.nameAuthor}
        resetFields
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un nombre!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastnameAuthor"
        label="Apellido"
        initialValue={selectedRow.lastnameAuthor}
        rules={[
          {
            type: "string",
            message: "Ingrese un nombre valido!",
          },
          {
            required: true,
            message: "Ingrese un apellido!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateAuthorForm;