import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { postData, putData, deleteData } from "../../services/api";
import { BASE_URL } from "../../global";

const onFinishReturn = async (selectedRow,user,running) => {
  const token = window.localStorage.getItem("token");
  const now = new Date();
  const returnBook = {};
  returnBook.idUser = user.idUser;
  returnBook.idBook = selectedRow.book?.idBook;
  returnBook.loanDate = selectedRow.loanDate;
  returnBook.returnDate = now;
  try {
    await putData(`${BASE_URL}/userhasbooks/${selectedRow.idUserHasBook}`,returnBook,token);
    notification.success({
    message: "El libro se regreso con exito",
    description: `El libro sido regresado exitosamente`,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
  running(false);
  } catch (error) {
    notification.error({
      message: "La devolucion no pudo ser realizado",
      description: `Error al actualizar`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }
};

const onOkDelete = async (selectedRow) => {
  try {
    const token = window.localStorage.getItem("token");
    await deleteData(`${BASE_URL}/books/${selectedRow.idAuthor}`, token);
    notification.warning({
      message: "Autor desactivado",
      description: `Los datos han sido eliminados`,
    });
  } catch (error) {
    notification.warning({
      message: "Error al desactivar author",
      description: `Los datos no han sido eliminados`,
    });
  }
};

export { onFinishReturn, onOkDelete };