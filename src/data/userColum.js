import { sharedOnCell } from "../utils/tableSettings";

const UserColumn = (dataSearch) => {
  const columns = [
    {
      title: "#",
      dataIndex: `idUser`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idUser - b.idUser,
    },
    {
      title: "Nombre",
      dataIndex: "username",
      key: "name",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record.lastnameUser)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.idUser).toLowerCase().includes(value.toLowerCase()) ||
          String(record.emailUser).toLowerCase().includes(value.toLowerCase()) ||
          String(record.roleUser).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Apellido",
      dataIndex: "lastnameUser",
      key: "lastname",
      onCell: sharedOnCell,
    },
    {
      title: "Correo",
      dataIndex: "emailUser",
      key: "email",
      onCell: sharedOnCell,
    },
    {
      title: "Rol",
      dataIndex: "roleUser",
      key: "role",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default UserColumn;