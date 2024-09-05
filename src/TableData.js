import React, { useEffect, useState } from "react";
import { Table, Space, Switch, Input } from "antd";

const TableData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3081/getMedicareData")
      .then((resp) => resp.json())
      .then((result) => setData(result));
  }, []);



  const columns = [
    {
      title: "year",
      dataIndex: "year",
      key: 'year',
      sorter: (a, b) => a.year.localeCompare(b.year),
    },
    {
      title: "locationabbr",
      dataIndex: "locationabbr",
      key: 'locationabbr',
      sorter: (a, b) => a.locationabbr.localeCompare(b.locationabbr),
    },
    {
      title: "locationdesc",
      dataIndex: "locationdesc",
    },
    {
      title: "datasource",
      dataIndex: "datasource",
    },
    {
      title: "priorityarea1",
      dataIndex: "priorityarea1",
    },
    {
      title: "priorityarea3",
      dataIndex: "priorityarea3",
    },
    {
      title: "category",
      dataIndex: "category",
    },
    {
      title: "topic",
      dataIndex: "topic",
    },
    {
      title: "indicator",
      dataIndex: "indicator",
    },
    {
      title: "data_value_type",
      dataIndex: "data_value_type",
    },
    {
      title: "data_value_unit",
      dataIndex: "data_value_unit",
    },
    {
      title: "data_value",
      dataIndex: "data_value",
    },
    {
      title: "data_value_alt",
      dataIndex: "data_value_alt",
    },
    {
      title: "lowconfidencelimit",
      dataIndex: "lowconfidencelimit",
    },
    {
      title: "highconfidencelimit",
      dataIndex: "highconfidencelimit",
    },
    {
      title: "break_out_category",
      dataIndex: "break_out_category",
    },
    {
      title: "break_out",
      dataIndex: "break_out",
    },
    {
      title: "categoryid",
      dataIndex: "categoryid",
    },
    {
      title: "topicid",
      dataIndex: "topicid",
    },
    {
      title: "indicatorid",
      dataIndex: "indicatorid",
    },
    {
      title: "data_value_typeid",
      dataIndex: "data_value_typeid",
    },
    {
      title: "breakoutcategoryid",
      dataIndex: "breakoutcategoryid",
    },
    {
      title: "breakoutid",
      dataIndex: "breakoutid",
    },
    {
      title: "locationid",
      dataIndex: "locationid",
    },
  ];
  return (
    <>
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      ></Space>

      <Table
        columns={columns}
        dataSource={data}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </>
  );
};

export default TableData;
