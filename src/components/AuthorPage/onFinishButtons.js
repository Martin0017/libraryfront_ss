import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { postData, putData, deleteData } from "../../services/api";
import { BASE_URL } from "../../global";

const onFinish = async (values, running) => {
  const token = window.localStorage.getItem("token");
  try {
    await postData(`${BASE_URL}/authors`, values, token);
  notification.success({
    message: "Autor creado",
    description: `Author ha sido añadido exitosamente`,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
  running(false);
  } catch (error) {
    notification.error({
      message: "Autor no pudo ser creado",
      description: `Error al crear`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }
};

const onFinishUpdate = async (values, selectedRow, running) => {
  const token = window.localStorage.getItem("token");
  try {
    await putData(`${BASE_URL}/authors/${selectedRow.idAuthor}`, values, token);
    notification.success({
      message: "Autor actualizado",
      description: `Los datos han sido actualizados`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    running(false);
  } catch (error) {
    notification.error({
      message: "Autor no pudo ser actualizado",
      description: `Existio un error`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }
};

const onOkDelete = async (selectedRow) => {
  try {
    const token = window.localStorage.getItem("token");
    await deleteData(`${BASE_URL}/authors/${selectedRow.idAuthor}`, token);
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

export { onFinish, onFinishUpdate, onOkDelete };