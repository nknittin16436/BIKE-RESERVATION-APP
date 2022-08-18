import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import ReservationCard from "./ReservationCard";
import { createTheme, Grid } from "@mui/material";
import {
    getBikeReservations,
} from "../../Service/ReservationService";
import { useSearchParams } from "react-router-dom";

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

const BikeReservation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const bikeId = searchParams.get("bikeId");

  const [reservations, setReservations] = useState([]);

  const getAllBikeReservations = async () => {
    const data = await getBikeReservations(bikeId);
    setReservations(data.reservations);
  };

  useEffect(() => {
    getAllBikeReservations();
  }, []);
  return (
    <div className="reservation">
      <div className="reservation__container">
        <h1>Bike Reservation</h1>
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
                      <Grid
                        item
                        xs={12}
                        lg={6}
                        sm={12}
                        md={12}
                        key={reservation.id}
                      >
                        <ReservationCard
                          reservation={reservation}
                          key={reservation.id}
                          getAllReservations={getAllBikeReservations}
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
    </div>
  );
};

export default BikeReservation;
