import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Stats } from "../components/Stats";
import { HomeIcon } from "@heroicons/react/16/solid";
import { readAllData } from "../../functions/crud";
import moment from "moment";
import { Chart } from "react-google-charts";
import { Table } from "antd";
import { user_columns } from "./Users";

export const Home = () => {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  async function allBookings() {
    const data = await readAllData("bookings");
    setBookings(() => {
      return data.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
    });
  }

  async function allUsers() {
    const data = await readAllData("users");
    setUsers(() => {
      return data.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
    });
  }

  async function allFlights() {
    const data = await readAllData("flight");
    setFlights(() => {
      return data.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
    });
  }
  useEffect(() => {
    allBookings();
    allUsers();
    allFlights();
  }, []);

  const activeFlights = flights.filter((item) =>
    moment(item.departureDate).isAfter(moment.now())
  ).length;

  const inActiveFlights = flights.filter((item) =>
    moment(item.arrival).isBefore(moment.now())
  ).length;
  const bookingsTotal = bookings.length;
  const travelers = users.filter((item) => item.role === "traveler");

  return (
    <div className="">
      <div className="mb-6">
        <Header title={"Dashboard"} sublink={<Sublink />} />
      </div>
      <div>
        <Stats
          i_flights={inActiveFlights}
          a_flights={activeFlights}
          booking={bookingsTotal}
          users={users.length}
          travalers={travelers.length}
          flights={flights.length}
        />
      </div>
      <div className="p-4 grid grid-cols-3 gap-6">
        <span className="col-span-2">
          <ColumnChart
            users={users.length}
            booking={bookingsTotal}
            flights={flights.length}
            travelers={travelers.length}
          />
        </span>
        <span className="col-span-1">
          <PieCharts
            i_flights={inActiveFlights}
            a_flights={activeFlights}
            booking={bookingsTotal}
          />
        </span>
      </div>
      <div className="m-4 my-8">
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Users
          </h3>
        </div>
        <Table
          columns={user_columns}
          dataSource={users}
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
      home
    </div>
  );
};

const PieCharts = ({ i_flights, a_flights, booking }) => {
  const data = [
    ["title", "data"],
    ["Active Flights", a_flights],
    ["Inactive Flights", i_flights],
    ["Bookings", booking],
  ];
  return (
    <Chart
      chartType="PieChart"
      data={data}
      // options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

const ColumnChart = ({ users, booking, flights, travelers }) => {
  const data = [
    ["title", "Total", { role: "style" }],
    ["Users", users, "#b87333"], // RGB value
    ["Booking", booking, "silver"], // English color name
    ["Flights", flights, "gold"],
    ["Travelers", travelers, "color: #e5e4e2"], // CSS-style declaration
  ];

  return (
    <Chart chartType="ColumnChart" width="100%" height="100%" data={data} />
  );
};
