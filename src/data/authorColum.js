import { sharedOnCell } from "../utils/tableSettings";

const UserColumn = (dataSearch) => {
  const columns = [
    {
      title: "#",
      dataIndex: `idAuthor`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idAuthor - b.idAuthor,
    },
    {
      title: "Nombre",
      dataIndex: "nameAuthor",
      key: "name",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record.lastnameAuthor)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.idAuthor).toLowerCase().includes(value.toLowerCase()) ||
          String(record.nameAuthor).toLowerCase().includes(value.toLowerCase()) 
        );
      },
    },
    {
      title: "Apellido",
      dataIndex: "lastnameAuthor",
      key: "lastname",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default UserColumn;