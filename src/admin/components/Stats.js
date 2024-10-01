import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Card, Col, Row } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import React from "react";
import CountUp from "react-countup";
import { FaPlane, FaShippingFast } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";

const formatter = (value) => <CountUp end={value} separator="," />;
export const Stats = ({
  a_flights,
  i_flights,
  booking,
  travalers,
  users,
  flights,
}) => {
  return (
    <>
      <ActiveStat
        a_flights={a_flights}
        i_flights={i_flights}
        booking={booking}
        travalers={travalers}
      />

      <div className="ml-56 py-12">
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Total Booking"
              value={booking}
              formatter={formatter}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Flights"
              value={flights}
              //   precision={2}
              formatter={formatter}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Users"
              value={users}
              formatter={formatter}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

const ActiveStat = ({ a_flights, i_flights, booking, travalers }) => {
  return (
    <Row gutter={24}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Active Flights"
            value={a_flights}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<IoArrowUpOutline />}
            // suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Bookings"
            value={booking}
            precision={2}
            // valueStyle={{
            //   color: "#3f8600",
            // }}
            prefix={<FaShippingFast />}
            // suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Travelers"
            value={travalers}
            precision={2}
            // valueStyle={{
            //   color: "#cf1322",
            // }}
            prefix={<FaPlane />}
            // suffix="%"
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Inactive Flights"
            value={i_flights}
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<IoArrowUpOutline />}
            // suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};
