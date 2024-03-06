import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Row, Col, Table, Input } from "antd";

const DataTable = (props) => {
  const {
    columns,
    rowSelection,
    setterDataSearch,
    data,
    resetValues,
    setterModalInsert,
    disblableButton,
    setterModalUpdate,
    setterModalDelete,
    SearchLabel,
  } = props;

  const { Search } = Input;

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      rowKey={(record) =>
        record.idUserHasBook
      }
      rowSelection={{
        type: "radio",
        ...rowSelection,
      }}
      title={() => (
        <Search
          placeholder={SearchLabel}
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={(value) => {
            setterDataSearch(value);
          }}
        />
      )}
      footer={() => (
        <Row>
       
      </Row>
      )}
    />
  );
};

export default DataTable;