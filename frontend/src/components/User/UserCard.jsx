import React, { useState } from "react";
import "antd/dist/antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Button, Space, Input, Select } from "antd";
import "../../App.css";
import { updateReservations } from "../../Service/ReservationService";
import { useNavigate } from "react-router-dom";
import { deleteUser, editUser } from "../../Service/UserService";
import { useSelector } from "react-redux";
const { Option } = Select;
const { Meta } = Card;

const UserCard = ({ user, getAllUsers }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);
  const navigate = useNavigate();
  const userId = user.id;

  const { isManager, loggedInUser } = useSelector(
    (state) => state.bikeReservation
  );

  const handleSeeReservations = async () => {
    navigate(`/reservations/user?userId=${userId}`);
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handleDeleteUser = async () => {
    await deleteUser(userId);
    await getAllUsers();
  };

  const handleUpdateUser = async () => {
    console.log(editedName, editedEmail, editedRole);
    await editUser(user.id, editedName, editedEmail, editedRole);
    await getAllUsers();
    setIsEditMode(false);
  };

  return (
    <Card
      style={{
        width: 500,
      }}
      actions={[
        <Button onClick={handleSeeReservations}>See Reservations</Button>,
      ]}
      extra={
        <Space>
          {isManager && !isEditMode && (
            <Button type="success" onClick={handleEditUser}>
              Edit
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="success" onClick={handleUpdateUser}>
              Update
            </Button>
          )}
          {isManager && (
            <Button type="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          )}
        </Space>
      }
    >
      <Meta
        title={`Name: ${user.name}`}
        description={
          <div>
            {!isEditMode && (
              <div>
                <p>{`Email : ${user.email}`}</p>
                <p>{`Role : ${user.role}`}</p>
              </div>
            )}

            {isEditMode && (
              <div>
                <Space>
                  Name:{" "}
                  <Input
                    placeholder="Enter Your Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Email:{" "}
                  <Input
                    placeholder="Enter Your Email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space wrap>
                  Role :
                  <Input.Group compact>
                    <Select defaultValue={editedRole} onChange={setEditedRole}>
                      <Option value="regular">Regular</Option>
                      <Option value="manager">Manager</Option>
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

export default UserCard;
