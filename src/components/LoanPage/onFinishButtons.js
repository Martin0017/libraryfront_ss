import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { postData, putData, deleteData } from "../../services/api";
import { BASE_URL } from "../../global";

const onFinishLoan = async (selectedRow,user,running) => {
  const token = window.localStorage.getItem("token");
  const now = new Date();
  const loan = {};
  loan.idUser = user.idUser;
  loan.idBook = selectedRow.idBook;
  loan.loanDate = now;
  try {
    await postData(`${BASE_URL}/userhasbooks`,loan, token);
  notification.success({
    message: "El prestamo se logro con exito",
    description: `El libro sido añadido exitosamente en su lista`,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
  running(false);
  } catch (error) {
    notification.error({
      message: "El prestamo no pudo ser realizado",
      description: `Error al crear`,
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

export { onFinishLoan, onOkDelete };