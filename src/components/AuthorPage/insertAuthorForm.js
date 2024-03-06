import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertAuthorForm = (props) => {
  const { form, onFinish, running } = props;

  const handleFinish = (values) => {
    onFinish(values, running);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="nameAuthor"
        label="Nombre"
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
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertAuthorForm;