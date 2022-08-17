import React, { useState, useEffect } from "react";
import "antd/dist/antd";
import "../../../index.css";
import Pagination from "react-js-pagination";

import { Layout, Input, Space, DatePicker, Button, Select, Modal } from "antd";
import BikeCard from "./BikeCard";
import { createTheme, Grid } from "@mui/material";
import { addNewBike, getBikes } from "../../../Service/BikeService";
import { useDispatch, useSelector } from "react-redux";
import { AddBikeSchema } from "../../../JoiSchema/Schema";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
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
  const PAGE_SIZE = 5;

  const { isManager, isDateFilterAdded, totalBikes } = useSelector(
    (state) => state.bikeReservation
  );

  const dispatch = useDispatch();
  const [rating, setRating] = useState("0");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addBikeName, setAddBikeName] = useState("");
  const [addBikeColor, setAddBikeColor] = useState("");
  const [addBikeLocation, setAddBikeLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const handleSubmitAddBike = async () => {
    try {
      await AddBikeSchema.validateAsync({
        name: addBikeName,
        color: addBikeColor,
        location: addBikeLocation,
      });
      setIsModalVisible(false);
      setLoading(true);
      console.log(addBikeName, addBikeColor, addBikeLocation);
      const res = await addNewBike({
        addBikeName,
        addBikeColor,
        addBikeLocation,
      });
      if (res.success) {
        setLoading(false);
        alert.show("Bike Added Succesfully");
        await getAllBikes();
      } else {
        setLoading(false);
        alert.show("Some Error Occured");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert.show(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAllBikes = async () => {
    const data = await getBikes({
      name,
      location,
      color,
      rating,
      fromDate: duration[0],
      toDate: duration[1],
      page: currentPage,
      PAGE_SIZE,
    });
    console.log(data);
    dispatch({ type: "totalBikes", payload: data.totalBikes });
    setBikes(data.bikes);
  };

  const handleAddBike = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    getAllBikes();
  }, [currentPage]);

  const handleChange = (date, dateString) => {
    console.log("hellooo");
    console.log("Date", date);
    console.log("DateString", dateString);
    setDuration(dateString);
  };

  const handleFilterSubmit = async () => {
    console.log({ name, location, color, rating, duration });
    const data = await getBikes({
      name,
      location,
      color,
      rating,
      fromDate: duration[0],
      toDate: duration[1],
      page: currentPage,
      PAGE_SIZE,
    });
    console.log(data);
    dispatch({ type: "totalBikes", payload: data.totalBikes });
    setBikes(data.bikes);
    if (duration[0] !== "" && duration[1] !== "") {
      dispatch({ type: "isDateFilterAdded", payload: true });
    } else {
      dispatch({ type: "isDateFilterAdded", payload: false });
    }
  };

  const handleRemoveFilter = () => {};

  return (
    <div className="bike__homapage">
      {loading ? (
        <Loader />
      ) : (
        <div className="bike__homepage__container">
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
                height: "90vh",
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
                      <Option value="0">0</Option>
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
                  <Button onClick={handleFilterSubmit} type="primary">
                    Apply Filter
                  </Button>
                  <Button onClick={handleRemoveFilter}>Remove Filter</Button>
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
                <div className="bikes__container">
                  <Button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleAddBike}
                  >
                    Add a bike
                  </Button>
                  <div className="bike__cards">
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
                </div>
              </Content>
            </Layout>
          </Layout>

          <Modal
            title="Add New Bike"
            visible={isModalVisible}
            onOk={handleSubmitAddBike}
            onCancel={handleCancel}
            okText="Add Bike"
          >
            <div>
              <Space>
                Name:{" "}
                <Input
                  placeholder="Enter Bike Name"
                  value={addBikeName}
                  onChange={(e) => setAddBikeName(e.target.value)}
                />
              </Space>
              <br />
              <br />
              <Space>
                Color:{" "}
                <Input
                  placeholder="Enter Bike Color"
                  value={addBikeColor}
                  onChange={(e) => setAddBikeColor(e.target.value)}
                />
              </Space>
              <br />
              <br />
              <Space>
                Location:{" "}
                <Input
                  placeholder="Enter Bike Location"
                  value={addBikeLocation}
                  onChange={(e) => setAddBikeLocation(e.target.value)}
                />
              </Space>
            </div>
          </Modal>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={PAGE_SIZE}
              totalItemsCount={Number(totalBikes)}
              onChange={(e) => setCurrentPage(e)}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Bike;
