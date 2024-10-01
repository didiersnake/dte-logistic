import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Home } from "./pages/Home";
import { Flights } from "./pages/Flights";
import { Bookings } from "./pages/Bookings";
import { Users } from "./pages/Users";
import { Testimonials } from "./pages/Testimonials";
import DTE from "../images/dts.jpeg";
import { logout } from "../functions/auth";
const { Header, Sider, Content } = Layout;

export const AdminDashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selected, setSelected] = useState("1");

  const Content1 = () => {
    if (selected === "1") {
      return (
        <div>
          <Home />
        </div>
      );
    } else if (selected === "2") {
      return (
        <div>
          <Flights />
        </div>
      );
    } else if (selected === "3") {
      return (
        <div>
          <Bookings />
        </div>
      );
    } else if (selected === "4") {
      return (
        <div>
          <Users />
        </div>
      );
    } else if (selected === "5") {
      return (
        <div>
          <Testimonials />
        </div>
      );
    } else {
      logout();
    }
  };
  return (
    <div className="min-h-screen">
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <h2 className="text-white mx-auto py-6 font-semibold text-center flex justify-center">
            <img className="rounded-full w-16" src={DTE} alt="logo" />
          </h2>
          <Menu
            selectedKeys={selected}
            onSelect={(e) => {
              setSelected(e.key);
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "DashBoard",
              },
              {
                key: "2",
                label: "Flights",
              },
              {
                key: "3",
                label: "Bookings",
              },
              {
                key: "4",
                label: "Users",
              },
              {
                key: "5",
                label: "Testimonials",
              },
              {
                key: "6",
                label: "Sign Out",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Content1 />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
