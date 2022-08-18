import React, { useState, useEffect } from "react";
import { Layout, Space, Modal, Button, Input } from "antd";
import UserCard from "./UserCard";
import { createTheme, Grid } from "@mui/material";
import { getUsers, registerUser } from "../../Service/UserService";
import { useAlert } from "react-alert";
import { SignUpSchema } from "../../JoiSchema/Schema";
import Loader from "../Loader/Loader";
const { Content } = Layout;

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
  const alert = useAlert();

  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitAddUser = async () => {
    try {
      console.log({ name, email, password, confirmPassword });
      await SignUpSchema.validateAsync({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      setLoading(true);
      const res = await registerUser({
        name,
        email,
        password,
        confirmPassword,
      });
      if (res.success) {
        setLoading(false);
        alert.show("User Added Succesfully");
        setIsModalVisible(false);
        await getAllUsers();
      } else {
        setLoading(false);
        setIsModalVisible(false);
        alert.show("Some error occured Please try again");
      }
    } catch (error) {
      setLoading(false);
      setIsModalVisible(false);
      alert.show(error.message);
    }
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
    <div className="users__homepage">
      {loading ? (
        <Loader />
      ) : (
        <div className="users__homepage__container">
          <Space>
            <Button onClick={handleAddUser}>Add User</Button>
          </Space>
          <div className="users__container">
            <Layout>
              <Layout className="site-layout">
                <Content
                  className="site-layout-background"
                  style={{
                    margin: "50px 25px",
                    padding: 25,
                  }}
                >
                  <div className="users__cards">
                    <Grid container spacing={2} theme={theme}>
                      {users &&
                        users.map((user) => (
                          <Grid
                            item
                            xs={12}
                            lg={6}
                            sm={12}
                            md={12}
                            key={user.id}
                          >
                            <UserCard
                              user={user}
                              key={user.id}
                              getAllUsers={getAllUsers}
                              setLoading={setLoading}
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
      )}
    </div>
  );
};

export default Users;
