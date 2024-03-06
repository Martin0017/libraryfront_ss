import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../global";
import { Form, Button } from "antd";
import {
  onFinishLoan,
  onOkDelete,
} from "../components/LoanPage/onFinishButtons";
import DataTable from "../components/LoanPage/table";
import BookColumn from "../data/bookColum";
import ModalOpen from "../components/Modal";
import { postData } from "../services/api";

const LoanPage = () => {
  const [users, setUsers] = useState([]);
  const [userlogged, setUserLogged] = useState({});
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
      const userEmail = {};
      userEmail.emailUser = window.localStorage.getItem("user");
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
        titleModal={"Pedir Libro"}
        resetValues={resetValues}
        isDelete={false}
        selectedRow={selectedRow}
        onFinishLoan={onFinishLoan}
        user={userlogged}
        running={setterModalInsert}
        form={<> 
          Esta seguro que desea pedir el siguiente libro? <br/> 
          {`${selectedRow.nameBook} ${selectedRow.volumeBook} de ${selectedRow.author?.nameAuthor} ${selectedRow.author?.lastnameAuthor}`}
        </>}
      />
    </div>
  );
};

export default LoanPage;
