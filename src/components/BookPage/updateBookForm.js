import { Form, Select, Input, DatePicker, Button } from "antd";
import React, {useEffect} from "react";
import dayjs from "dayjs";
import { formItemLayout, tailFormItemLayout } from "../../utils/formLayout";
const { Option } = Select;

const UpdateBookForm = (props) => {
  const { onFinishUpdate, selectedRow, form, running, data } = props;

  useEffect(() => {
    form.setFieldsValue({
      nameBook: selectedRow.nameBook,
      genreBook: selectedRow.genreBook,
      volumeBook: selectedRow.volumeBook,
      idAuthor: selectedRow.author?.idAuthor, 
    });
  }, [selectedRow, form]);

  const handleFinish = (values) => {
    onFinishUpdate(values, selectedRow, running);
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
        initialValue={selectedRow.nameBook}
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
        initialValue={selectedRow.genreBook}
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
        initialValue={selectedRow.volumeBook}
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
      initialValue={selectedRow.author.idAuthor}
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateBookForm;