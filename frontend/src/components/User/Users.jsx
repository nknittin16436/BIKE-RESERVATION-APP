import React, { useState, useEffect } from "react";
import { Layout, Space, Modal, Button,Input } from "antd";
import Navbar from "../Home/Navbar/Navbar";
import UserCard from "./UserCard";
import { createTheme, Grid } from "@mui/material";
import { getReservations } from "../../Service/ReservationService";
import { getUsers, registerUser } from "../../Service/UserService";
const { Header, Sider, Content } = Layout;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 1120,
      sm: 1120,
      md: 1536,
      lg: 1536,
      xl: 1536,
    },
  },
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitAddUser = async () => {
    setIsModalVisible(false);
    console.log({ name, email, password, confirmPassword });
    await registerUser({ name, email, password, confirmPassword });
    await getAllUsers();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddUser = () => {
    setIsModalVisible(true);
  };
  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data.users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="reservation">
      <Space>
        <Button onClick={handleAddUser}>Add User</Button>
      </Space>
      <div className="reservation__container">
        <Layout>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "50px 25px",
                padding: 25,
              }}
            >
              <div className="reservations__cards">
                <Grid container spacing={2} theme={theme}>
                  {users &&
                    users.map((user) => (
                      <Grid item xs={12} lg={6} sm={12} md={12} key={user.id}>
                        <UserCard
                          user={user}
                          key={user.id}
                          getAllUsers={getAllUsers}
                        />
                      </Grid>
                    ))}
                </Grid>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
      <div className="user__add__modal">
        <Modal
          title="Add New User"
          visible={isModalVisible}
          onOk={handleSubmitAddUser}
          onCancel={handleCancel}
          okText="Add User"
        >
          <div>
            <Space>
              Name:{" "}
              <Input
                placeholder="Enter User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Space>
            <br />
            <br />
            <Space>
              Email:{" "}
              <Input
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Space>
            <br />
            <br />
            <Space>
              Password:{" "}
              <Input
                placeholder="Enter password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
            <br />
            <br />
            <Space>
              Password:{" "}
              <Input
                placeholder="Enter password Again"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Space>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Users;
