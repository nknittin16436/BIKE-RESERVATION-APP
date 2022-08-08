import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Navbar from "../Home/Navbar/Navbar";
import ReservationCard from "./ReservationCard";
import { createTheme, Grid } from "@mui/material";
import { getReservations } from "../../Service/ReservationService";
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

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  const getAllReservations = async () => {
    const data = await getReservations();
    setReservations(data.reservations);
  };

  useEffect(() => {
    getAllReservations();
  }, []);
  return (
    <div className="reservation">
      <div className="reservation__container">
        <Navbar />
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
                  // alignItems="stretch"
                >
                  {reservations &&
                    reservations.map((reservation) => (
                      <Grid item xs={12} lg={6} sm={12} md={12}>
                        <ReservationCard
                          reservation={reservation}
                          key={reservation.id}
                          getAllReservations={getAllReservations}
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

export default Reservation;
