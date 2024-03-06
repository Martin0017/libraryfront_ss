import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  FontColorsOutlined,
  SmileOutlined,
  DribbbleOutlined,
  BookOutlined,
  AntDesignOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function getItem(label, key, icon) {
  return {
    icon,
    key,
    label,
  };
}

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const items = [
  getItem(
    "Usuarios",
    "1",
    <NavLink to={"/user"}>
      {" "}
      <UserOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Autores",
    "2",
    <NavLink to={"/author"}>
      {" "}
      <FontColorsOutlined />{" "}
    </NavLink>,
  ),
  /*getItem(
    "Ganadores",
    "3",
    <NavLink to={"/winner"}>
      {" "}
      <SmileOutlined />{" "}
    </NavLink>,
  ),*/
  getItem(
    "Libros",
    "3",
    <NavLink to={"/book"}>
      {" "}
      <BookOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Libros Prestados",
    "4",
    <NavLink to={"/userhasbook"}>
      {" "}
      <CalendarOutlined />{" "}
    </NavLink>,
  ), /*
  getItem(
    "Registros",
    "5",
    <NavLink to={"/register"}>
      {" "}
      <BookOutlined />{" "}
    </NavLink>,
  ),*/
  /*getItem(
    "Acceso",
    "6",
    <NavLink to={"/admin"}>
      {" "}
      <AntDesignOutlined />{" "}
    </NavLink>,
  ),*/
  getItem(
    "Salir",
    "5",
    <NavLink onClick={logout} style={{ color: 'red' }}> 
      <LogoutOutlined style={{ color: 'red' }} /> 
    </NavLink>,
  ),
];

export default items;