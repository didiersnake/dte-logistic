import React, { useEffect, useState } from "react";
import { deleteData, readAllData } from "../../functions/crud";
import moment from "moment";
import { HomeIcon } from "@heroicons/react/16/solid";
import { Header } from "../components/Header";
import { Table } from "antd";

export const Testimonials = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "c_email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      dataIndex: " ",
      key: "c_email",
      render: () => <a className="text-red-500">Delete</a>,
      //   onclick: (record) => deleteData("testimony", record.id),
    },
  ];

  async function allFlights() {
    const data = await readAllData("testimony");
    setData(() => {
      return data.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
    });
  }
  useEffect(() => {
    allFlights();
  }, []);

  return (
    <div className="">
      <div className="mb-6">
        <Header title={"Testimonials"} sublink={<Sublink />} />
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={true}
        />
      </div>
    </div>
  );
};

const Sublink = () => {
  return (
    <div className="mt-2 flex items-center text-sm text-gray-500">
      <HomeIcon
        aria-hidden="true"
        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
      />
      home / Testimonials
    </div>
  );
};
