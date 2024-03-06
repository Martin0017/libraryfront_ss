import { sharedOnCell } from "../utils/tableSettings";

const BookColumn = (dataSearch) => {
  const columns = [
    {
      title: "#",
      dataIndex: `idBook`,
      rowScope: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.idUser - b.idUser,
    },
    {
      title: "Nombre",
      dataIndex: "nameBook",
      key: "name",
      onCell: sharedOnCell,
      filteredValue: [dataSearch],
      onFilter: (value, record) => {
        return (
          String(record.genreBook)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.idBook).toLowerCase().includes(value.toLowerCase()) ||
          String(record.nameBook)
            .toLowerCase()
            .includes(value.toLowerCase()) 
        );
      },
    },
    {
      title: "Genero",
      dataIndex: "genreBook",
      key: "genre",
      onCell: sharedOnCell,
    },
    {
      title: "Volumen",
      dataIndex: "volumeBook",
      key: "volume",
      onCell: sharedOnCell,
    },
    {
      title: "Nombre Autor",
      dataIndex: ["author", "nameAuthor"],
      key: "nameAuthor",
      onCell: sharedOnCell,
    },
    {
      title: "Apellido Autor",
      dataIndex: ["author", "lastnameAuthor"],
      key: "lastnameAuthor",
      onCell: sharedOnCell,
    },
  ];

  return columns;
};

export default BookColumn;
