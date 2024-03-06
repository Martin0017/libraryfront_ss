import { Select, Form, Input, DatePicker, Checkbox, Button } from "antd";
import { tailFormItemLayout, formItemLayout } from "../../utils/formLayout";
import React from "react";
const { Option } = Select;

const InsertBookForm = (props) => {
  const { form, onFinish, running, data} = props;

  const handleFinish = (values) => {
    onFinish(values, running);
  };
  
  const handleChange = (value) => { 
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
        name="nameBook"
        label="Nombre del Libro"
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
        name="genreBook"
        label="Genero"
        rules={[
          {
            type: "string",
            message: "Ingrese un genero valido!",
          },
          {
            required: true,
            message: "Ingrese un genero!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="volumeBook"
        label="Volumen"
        rules={[
          {
            type: "string",
            message: "Ingrese un volumen valido!",
          },
          {
            required: true,
            message: "Ingrese un volumen!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      name="idAuthor"
      label="Autor"
      rules={[
        {
          required: true,
          message: "Seleccione un autor!",
        },
      ]}
      >
      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Selecciona una opción"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map(item => (
        <Option key={item.id} value={item.idAuthor}>{`${item.nameAuthor} ${item.lastnameAuthor}`}</Option>
      ))}
    </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertBookForm;