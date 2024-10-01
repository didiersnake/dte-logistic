import React, { useEffect, useState } from "react";
import { readAllData } from "../../functions/crud";
import moment from "moment";
import { HomeIcon } from "@heroicons/react/16/solid";
import { Table } from "antd";
import { Header } from "../components/Header";

export const user_columns = [
  // {
  //   title: "CreatedAt",
  //   dataIndex: "createdAt",
  //   key: "__",
  //   render: (text) => <div className="text-blue-400">{text}</div>,
  // },

  {
    title: "First Name",
    dataIndex: "firstName",
    key: "name",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "c_email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "..",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "c_phone",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Birth",
    dataIndex: "dob",
    key: "t_name",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
];
export const Users = () => {
  const [data, setData] = useState([]);

  async function allFlights() {
    const data = await readAllData("users");
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
        <Header title={"Users"} sublink={<Sublink />} />
      </div>
      <div>
        <Table
          columns={user_columns}
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
      home / users
    </div>
  );
};
