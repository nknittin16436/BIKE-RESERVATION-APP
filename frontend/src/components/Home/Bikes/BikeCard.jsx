import React, { useState } from "react";
import "antd/dist/antd";
import { Card, Button, Space, Input, Rate, Typography, Select } from "antd";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createBikeReservation,
} from "../../../Service/ReservationService";
import { deleteBike, updateBike } from "../../../Service/BikeService";
import { useAlert } from "react-alert";
import { AddBikeSchema } from "../../../JoiSchema/Schema";
const { Option } = Select;
const { Meta } = Card;
const { Text } = Typography;

const BikeCard = ({ bike, getAllBikes, duration, setLoading }) => {
  const { isManager, isDateFilterAdded } = useSelector(
    (state) => state.bikeReservation
  );
  const bikeId = bike.id;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(bike.name);
  const [editedColor, setEditedColor] = useState(bike.color);
  const [editedLocation, setEditedLocation] = useState(bike.location);
  const [editedIsAvailable, setEditedIsAvailable] = useState(bike.isAvailable);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleSeeReservations = async () => {
    navigate(`/reservations/bike?bikeId=${bikeId}`);
  };

  const handleEditBike = () => {
    setIsEditMode(true);
  };
  const handleUpdateCancelBike = () => {
    setIsEditMode(false);
    setEditedName(bike.name);
    setEditedColor(bike.color);
    setEditedLocation(bike.location);
  };

  const handleDeleteBike = async () => {
    try {
      setLoading(true);
      const res = await deleteBike(bikeId);
      if (res.success) {
        setLoading(false);
        alert.show("Bike Deleted succesfully");
        await getAllBikes();
      } else {
        setLoading(false);
        alert.show("Some error occured");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };

  const handleUpdateBike = async () => {
    try {
      await AddBikeSchema.validateAsync({
        name: editedName,
        color: editedColor,
        location: editedLocation,
        isAvailable:editedIsAvailable
      });
      setLoading(true);
      const res = await updateBike({
        bikeId,
        editedName,
        editedColor,
        editedLocation,
        editedIsAvailable,
      });
      if (res.success) {
        setLoading(false);
        alert.show("Bike updated succesfully");
        await getAllBikes();
        setIsEditMode(false);
      } else {
        setIsEditMode(false);
        setLoading(false);
        alert.show("Some error occured");
      }
    } catch (error) {
      setIsEditMode(false);
      alert.show(error.message);
    }
  };

  const submitBookNowBike = async () => {
    try {
      const res = await createBikeReservation({
        bikeId,
        fromDate: duration[0],
        toDate: duration[1],
      });
      if (res.success) {
        await getAllBikes();
        alert.show("Bike booked succesfully");
      }
    } catch (error) {
      alert.show(error.message);
    }
  };

  return (
    <Card
      style={{
        width: 500,
      }}
      cover={
        <img
          alt="example"
          src="https://images.unsplash.com/photo-1502744688674-c619d1586c9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
      }
      actions={[
        <div>
          {isDateFilterAdded && bike.isAvailable ? (
            <span>
              <Button type="success" onClick={submitBookNowBike}>
                Book Now
              </Button>
            </span>
          ) : (
            <Text type="danger">Select valid duration to book a bike</Text>
          )}
        </div>,
        <Space>
          {isManager && (
            <Button onClick={handleSeeReservations}>See Reservations</Button>
          )}
        </Space>,
      ]}
      extra={
        <Space>
          {isManager && !isEditMode && (
            <Button type="primary" onClick={handleEditBike}>
              Edit
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="success" onClick={handleUpdateCancelBike}>
              Cancel
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="primary" onClick={handleUpdateBike}>
              Update
            </Button>
          )}
          {isManager && (
            <Button type="danger" onClick={handleDeleteBike}>
              Delete
            </Button>
          )}
        </Space>
      }
    >
      <Meta
        title={`Bike Name : ${bike.name}`}
        description={
          <div>
            {!isEditMode && (
              <div>
                <p>{`Color : ${bike.color}`}</p>
                <p>{`Location : ${bike.location}`}</p>
                <span>
                  Rating : <Rate disabled defaultValue={bike.averageRating} />{" "}
                  <br />
                  <br />
                </span>
                {bike.isAvailable && (
                  <span>
                    Status: <Text type="success"> Available</Text>
                  </span>
                )}

                {isManager && !bike.isAvailable && (
                  <Space>
                    Status : <Text type="danger"> Currently Unavailable</Text>
                  </Space>
                )}
              </div>
            )}

            {isEditMode && (
              <div>
                <Space>
                  Name:{" "}
                  <Input
                    placeholder="Enter Bike Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Color:{" "}
                  <Input
                    placeholder="Enter Bike Color"
                    value={editedColor}
                    onChange={(e) => setEditedColor(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Location:{" "}
                  <Input
                    placeholder="Enter Bike Location"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space wrap>
                  Available :
                  <Input.Group compact>
                    <Select
                      defaultValue={editedIsAvailable}
                      onChange={setEditedIsAvailable}
                    >
                      <Option value={false}>No</Option>
                      <Option value={true}>Yes</Option>
                    </Select>
                  </Input.Group>
                </Space>
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default BikeCard;
