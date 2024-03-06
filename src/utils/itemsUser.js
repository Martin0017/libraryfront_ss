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

const itemsUser = [
  getItem(
    "Pedir Libros",
    "1",
    <NavLink to={"/loanabook"}>
      {" "}
      <BookOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Devolver Libros",
    "2",
    <NavLink to={"/returnabook"}>
      {" "}
      <FontColorsOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Historial",
    "3",
    <NavLink to={"/history"}>
      {" "}
      <CalendarOutlined />{" "}
    </NavLink>,
  ),
  getItem(
    "Salir",
    "5",
    <NavLink onClick={logout} style={{ color: 'red' }}> 
      <LogoutOutlined style={{ color: 'red' }} /> 
    </NavLink>,
  ),
];

export default itemsUser;