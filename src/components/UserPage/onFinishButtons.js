import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { putData, deleteData } from "../../services/api";
import { BASE_URL } from "../../global";

const onFinish = (values) => {
  const updateUserObject = {};
  const month = values.nacimiento.$M + 1;

  updateUserObject.nombre_user = values.nombre;
  updateUserObject.apellido_user = values.apellido;
  updateUserObject.correo_user = values.correo;
  updateUserObject.contrasena_user = `${values.apellido}${values.nacimiento.$y}`;
  updateUserObject.fecha_nacimiento_user = `${values.nacimiento.$y}-${month}-${values.nacimiento.$D}`;
  updateUserObject.genero_user = values.genero;
  updateUserObject.id_emp = 2;
  updateUserObject.id_admin = 2;
  notification.success({
    message: "Usuario creado",
    description: `Notifique al usuario`,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
  setTimeout(function() {
    window.location.reload();
}, 2000);
  
};

const onFinishUpdate = async (values, selectedRow) => {
  const updateUserObject = {};
  if(values.roleUser === 'ADMIN'){
    notification.warning({
      message: "Usuario ya posee permisos elevados",
      description: `El usuario ya es administrador`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    return;
  }
  updateUserObject.idUser = values.idUser;
  updateUserObject.userName =  values.username;
  updateUserObject.emailUser =  values.emailUser;
  updateUserObject.password =  values.password;
  updateUserObject.lastnameUser =  values.lastnameUser;
  updateUserObject.roleUser = 1;
  const token = window.localStorage.getItem("token");
  try {
    await putData(`${BASE_URL}/users/${values.idUser}`, updateUserObject, token);
    notification.success({
      message: "Usuario actualizado",
      description: `Los privilegios han sido elevados`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  } catch (error) {
    notification.error({
      message: "Usuario no pudo ser actualizado",
      description: `Existio un error`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }

 

  //window.location.reload();
};

const onOkDelete = async (selectedRow) => {
  try {
    const token = window.localStorage.getItem("token");
    await deleteData(`${BASE_URL}/users/${selectedRow.idUser}`, token);
    notification.warning({
      message: "Usuario desactivado",
      description: `Los datos han sido eliminados`,
    });
  } catch (error) {
    notification.warning({
      message: "Error al desactivar usuario",
      description: `Los datos no han sido eliminados`,
    });
  }//remove(selectedRow.id_user, "user");
  
 // window.location.reload();
};

export { onFinish, onFinishUpdate, onOkDelete };