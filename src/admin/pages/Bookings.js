import { Header } from "../components/Header";
import { HomeIcon } from "@heroicons/react/16/solid";
import { readAllData } from "../../functions/crud";
import moment from "moment";
import { Button, Input, Space, Table } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export const Bookings = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<IoSearchOutline />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <IoSearchOutline
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns = [
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "__",
      render: (text) => <div className="text-blue-400">{text}</div>,
    },
    {
      title: "Client",
      dataIndex: "client_name",
      key: "name",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("client_name"),
    },
    {
      title: "Client Email",
      dataIndex: "client_email",
      key: "c_email",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("client_email"),
    },
    {
      title: "Client Phone",
      dataIndex: "client_phone",
      key: "c_phone",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("client_phone"),
    },
    {
      title: "Departure",
      dataIndex: "departure",
      key: "age",
      ...getColumnSearchProps("departure"),
    },
    {
      title: "Depature Date",
      dataIndex: "departureDate",
      key: "d_date",
      render: (item) => {
        return moment(item).isAfter(moment.now()) ? (
          <div className="text-green-500">{item}</div>
        ) : (
          <div className="text-red-500">{item}</div>
        );
      },
    },
    {
      title: "Traveler",
      dataIndex: "traveler_name",
      key: "t_name",
      ...getColumnSearchProps("traveler_name"),
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      ...getColumnSearchProps("destination"),
    },
    {
      title: "Arrival Date",
      dataIndex: "arrival",
      key: "arrival",
    },
    {
      title: "Traveler Email",
      dataIndex: "traveler_email",
      key: "email",
      ...getColumnSearchProps("traveler_email"),
    },
    {
      title: "Traveler Phone",
      dataIndex: "traveler_phone",
      key: "t_phone",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },
  ];
  async function allFlights() {
    const data = await readAllData("bookings");
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
        <Header title={"Bookings"} sublink={<Sublink />} />
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
      home / bookings
    </div>
  );
};
