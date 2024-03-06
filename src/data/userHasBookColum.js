import { sharedOnCell } from "../utils/tableSettings";

const UserHasBookColumn = (dataSearch) => {
  const columns = [
    {
      title: "#",
      dataIndex: `idUserHasBook`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idUser - b.idUser,
    },
    {
      title: "ID Usuario",
      dataIndex: ["user","idUser"],
      key: "iduser",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record.idUserHasBook)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.user.idUser).toLowerCase().includes(value.toLowerCase()) ||
          String(record.user.emailUser).toLowerCase().includes(value.toLowerCase()) ||
          String(record.book.idBook).toLowerCase().includes(value.toLowerCase()) ||
          String(record.book.nameBook).toLowerCase().includes(value.toLowerCase()) ||
          String(record.loanDate).toLowerCase().includes(value.toLowerCase())||
          String(record.returnDate).toLowerCase().includes(value.toLowerCase())

        );
      },
    },
    {
      title: "Correo del Usuario",
      dataIndex: ["user","emailUser"],
      key: "useremail",
      onCell: sharedOnCell,
    },
    {
      title: "ID del Libro",
      dataIndex: ["book","idBook"],
      key: "idbook",
      onCell: sharedOnCell,
    },
    {
        title: "Nombre del Libro",
        dataIndex: ["book","nameBook"],
        key: "namebook",
        onCell: sharedOnCell,
    },
    {
        title: "Prestado el",
        dataIndex: "loanDate",
        key: "loandate",
        onCell: sharedOnCell,
    },
    {
        title: "Devuelto el",
        dataIndex: "returnDate",
        key: "returdate",
        onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default UserHasBookColumn;