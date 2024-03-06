import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../global";
import { Form, Button } from "antd";
import DataTable from "../components/HistoryPage/table";
import UserHasBookColumn from "../data/userHasBookColum";
import { postData } from "../services/api";

const HistoryPage = () => {
  const [users, setUsers] = useState([]);
  const [userlogged, setUserLogged] = useState({});
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
      const email = window.localStorage.getItem("user");
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/userhasbooks`, {
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
            const userBooks = [];
            data.map((values) => {
              if (
                values.user?.emailUser === email &&
                values.returnDate !== null
              ) {
                userBooks.push(values);
              }
            });
            setUsers(userBooks);
          }
        } catch (error) {
          console.error("There was an error!", error);
        }
      } else {
        console.log("No token found!");
      }
      const userEmail = {};
      userEmail.emailUser = email;
      const getUser = await postData(
        `${BASE_URL}/users/byemail`,
        userEmail,
        window.localStorage.getItem("token")
      );
      setUserLogged(getUser);
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
        columns={UserHasBookColumn(dataSearch)}
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

    </div>
  );
};

export default HistoryPage;
