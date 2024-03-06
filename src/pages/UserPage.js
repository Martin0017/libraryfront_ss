import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../global";
import { Form} from "antd";
import {
  onFinishUpdate,
  onOkDelete,
} from "../components/UserPage/onFinishButtons";
import DataTable from "../components/UserPage/table";
import UserColumn from "../data/userColum";
import ModalOpen from "../components/Modal";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
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
      if(token) {
        try {
          const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
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
  }, [modalUpdate, modalDelete]);

  const setterDataSearch = (value) => setDataSearch(value);
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
        disblableButton={disblableButton}
        setterModalUpdate={setterModalUpdate}
        setterModalDelete={setterModalDelete}
        SearchLabel={"Ingrese #, Apellido , Correo o Role"}
      />

      <ModalOpen
        modalBegin={modalUpdate}
        titleModal={"Elevar privilegios del Usuario"}
        resetValues={resetValues}
        running={setterModalUpdate}
        isDelete={false}
        onFinishUpdate={onFinishUpdate}
        selectedRow={selectedRow}
        form={
          <p>
            Esta a punto de elevar permisos al usuario
            {` ${selectedRow.username} `}
            {`${selectedRow.lastnameUser} `}
            con ID: {selectedRow.idUser}{" "}
          </p>
        }
      />

      <ModalOpen
        modalBegin={modalDelete}
        titleModal={"Desactivar usuario"}
        resetValues={resetValues}
        running={setterModalDelete}
        design={{ danger: true }}
        okDelete={onOkDelete}
        selectedRow={selectedRow}
        isDelete={true}
        form={
          <p>
            Esta a punto de desactivar al usuario
            {` ${selectedRow.username} `}
            {`${selectedRow.lastnameUser} `}
            con ID: {selectedRow.idUser}{" "}
          </p>
        }
      />
    </div>
  );
};

export default UserPage;