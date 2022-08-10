import React, { useState, useEffect } from "react";
import "antd/dist/antd";
import "../../../index.css";
import { Layout, Input, Space, DatePicker, Button, Select } from "antd";
import BikeCard from "./BikeCard";
import { createTheme, Grid } from "@mui/material";
import { getBikes } from "../../../Service/BikeService";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;

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

const Bike = ({}) => {
  const { isManager, isDateFilterAdded } = useSelector(
    (state) => state.bikeReservation
  );

  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState([]);

  const [bikes, setBikes] = useState([]);

  const getAllBikes = async () => {
    const data = await getBikes();
    console.log(data);
    setBikes(data.bikes);
  };

  useEffect(() => {
    getAllBikes();
  }, []);

  const handleChange = (date, dateString) => {
    console.log("hellooo");
    console.log("Date", date);
    console.log("DateString", dateString);
    dispatch({ type: "isDateFilterAdded", payload: !isDateFilterAdded });
    setDuration(dateString);
  };

  const handleFilterSubmit = () => {
    console.log(name, location, color, rating, duration);
  };

  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          padding: 24,
          height: '90vh',
          // position: 'fixed',
          // left: 0,
          // top: 0,
          // bottom: 0,
        }}

        
      >
        <div
          style={{
            padding: 24,
            minWidth: 400,
          }}
        >
          <Space size="large">
            Name :{" "}
            <Input
              placeholder="Bike Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Space>
          <br />
          <br />
          <Space size="large">
            Color :{" "}
            <Input
              placeholder="Bike Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Space>

          <br />
          <br />
          <Space size="large">
            Location :{" "}
            <Input
              placeholder="Bike Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Space>

          <br />
          <br />
          <Space wrap>
            Rating :
            <Input.Group compact>
              <Select defaultValue={rating} onChange={setRating}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Input.Group>
          </Space>
          <br />
          <br />
          <Space direction="vertical" size="large">
            Duration : <RangePicker showTime onChange={handleChange} />
          </Space>
          <br />
          <br />
          <Space size="large">
            <Button onClick={handleFilterSubmit}>Apply Filter</Button>
          </Space>
        </div>
      </Sider>
      <Layout>
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
              {bikes &&
                bikes.map((bike) => (
                  <Grid item xs={12} key={bike.id}>
                    <BikeCard
                      bike={bike}
                      key={bike.id}
                      duration={duration}
                      getAllBikes={getAllBikes}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Bike;
