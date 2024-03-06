import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../global";
import { Form, Button } from "antd";
import {
  onFinish,
  onFinishUpdate,
  onOkDelete,
} from "../components/AuthorPage/onFinishButtons";
import DataTable from "../components/AuthorPage/table";
import InsertAuthorForm from "../components/AuthorPage/insertAuthorForm";
import UserColumn from "../data/authorColum";
import ModalOpen from "../components/Modal";
import UpdateAuthorForm from "../components/AuthorPage/updateAurhorForm";

const AuthorPage = () => {
  const [users, setUsers] = useState([]);
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
          const response = await fetch(`${BASE_URL}/authors`, {
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
        columns={UserColumn(dataSearch)}
        rowSelection={rowSelection}
        setterDataSearch={setterDataSearch}
        data={users}
        resetValues={resetValues}
        setterModalInsert={setterModalInsert}
        disblableButton={disblableButton}
        setterModalUpdate={setterModalUpdate}
        setterModalDelete={setterModalDelete}
        SearchLabel={"Ingrese #, Nombre o Apellido"}
      />

      <ModalOpen
        modalBegin={modalInsert}
        titleModal={"Inserte un autor"}
        resetValues={resetValues}
        isDelete={false}
        footer={null}
        running={setterModalInsert}
        form={
          <InsertAuthorForm
            form={form}
            onFinish={onFinish}
            running={setterModalInsert}
          />
        }
      />

      <ModalOpen
        modalBegin={modalUpdate}
        titleModal={"Actualizar datos de un autor"}
        resetValues={resetValues}
        running={setterModalUpdate}
        isDelete={false}
        footer={null}
        form={
          <UpdateAuthorForm
            form2={form}
            onFinishUpdate={onFinishUpdate}
            selectedRow={selectedRow}
            running={setterModalUpdate}
          />
        }
      />

      <ModalOpen
        modalBegin={modalDelete}
        titleModal={"Eliminar un autor"}
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

export default AuthorPage;
