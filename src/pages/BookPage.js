import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../global";
import { Form, Button } from "antd";
import {
  onFinish,
  onFinishUpdate,
  onOkDelete,
} from "../components/BookPage/onFinishButtons";
import DataTable from "../components/BookPage/table";
import InsertBookForm from "../components/BookPage/insertBookForm";
import BookColumn from "../data/bookColum";
import ModalOpen from "../components/Modal";
import UpdateBookForm from "../components/BookPage/updateBookForm";

const BookPage = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [disblableButton, setDisableButton] = useState(true);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const resetValues = () => {
    setTimeout(form.resetFields(), 500);
    setTimeout(form2.resetFields(), 500);
  };

  const onSelectChange = (newSelectedRowKeys, data) => {
    setSelectedRow(data[0]);
    setDisableButton(false);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  useEffect(() => {
    async function getAllRequest() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/books`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            const data = await response.json();
            setUsers(data);
          }
        } catch (error) {
          console.error("There was an error!", error);
        }

        try {
            const responseAuthor = await fetch(`${BASE_URL}/authors`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (!responseAuthor.ok) {
              throw new Error(`HTTP error! status: ${responseAuthor.status}`);
            } else {
              const dataBook = await responseAuthor.json();

              setBooks(dataBook);
            }
          } catch (error) {
            console.error("There was an error!", error);
          }

      } else {
        console.log("No token found!");
      }
    }

    getAllRequest();
  }, [modalUpdate, modalDelete, modalInsert]);

  const setterDataSearch = (value) => setDataSearch(value);
  const setterModalInsert = (value) => setModalInsert(value);
  const setterModalUpdate = (value) => setModalUpdate(value);
  const setterModalDelete = (value) => setModalDelete(value);

  return (
    <div>
      <DataTable
        columns={BookColumn(dataSearch)}
        rowSelection={rowSelection}
        setterDataSearch={setterDataSearch}
        data={users}
        resetValues={resetValues}
        setterModalInsert={setterModalInsert}
        disblableButton={disblableButton}
        setterModalUpdate={setterModalUpdate}
        setterModalDelete={setterModalDelete}
        SearchLabel={"Ingrese #, Nombre del Libro, Autor o Genero"}
      />

      <ModalOpen
        modalBegin={modalInsert}
        titleModal={"Inserte un libro"}
        resetValues={resetValues}
        isDelete={false}
        footer={null}
        running={setterModalInsert}
        form={
          <InsertBookForm
            form={form}
            onFinish={onFinish}
            running={setterModalInsert}
            data={books}
          />
        }
      />

      <ModalOpen
        modalBegin={modalUpdate}
        titleModal={"Actualizar un Libro"}
        resetValues={resetValues}
        running={setterModalUpdate}
        isDelete={false}
        footer={null}
        form={
          <UpdateBookForm
            form={form2}
            onFinishUpdate={onFinishUpdate}
            selectedRow={selectedRow}
            running={setterModalUpdate}
            data={books}
          />
        }
      />

      <ModalOpen
        modalBegin={modalDelete}
        titleModal={"Desactivar un Libro"}
        resetValues={resetValues}
        running={setterModalDelete}
        design={{ danger: true }}
        okDelete={onOkDelete}
        selectedRow={selectedRow}
        isDelete={true}
        form={
          <p>
            Esta a punto de desactivar al autor
            {` ${selectedRow.nameAuthor} `}
            {`${selectedRow.lastnameAuthor} `}
            con ID: {selectedRow.idAuthor}{" "}
          </p>
        }
      />
    </div>
  );
};

export default BookPage;
