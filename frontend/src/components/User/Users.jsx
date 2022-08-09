import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Navbar from "../Home/Navbar/Navbar";
import UserCard from "./UserCard";
import { createTheme, Grid } from "@mui/material";
import { getReservations } from "../../Service/ReservationService";
import { getUsers } from "../../Service/UserService";
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

  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data.users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="reservation">
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
                <Grid
                  container
                  spacing={2}
                  theme={theme}
                >
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
    </div>
  );
};

export default Users;
