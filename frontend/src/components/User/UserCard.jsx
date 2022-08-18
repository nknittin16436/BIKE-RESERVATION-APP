import React, { useState } from "react";
import "antd/dist/antd";
import { Card, Button, Space, Input, Select } from "antd";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { deleteUser, editUser } from "../../Service/UserService";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UpdateUserSchema } from "../../JoiSchema/Schema";
const { Option } = Select;
const { Meta } = Card;

const UserCard = ({ user, getAllUsers, setLoading }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);
  const navigate = useNavigate();
  const alert = useAlert();
  const userId = user.id;

  const { isManager } = useSelector((state) => state.bikeReservation);

  const handleSeeReservations = async () => {
    navigate(`/reservations/user?userId=${userId}`);
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const res = await deleteUser(userId);
      console.log(res);
      setLoading(false);
      if (res.success) {
        alert.show("User Deleted Succesfully");
        await getAllUsers();
      } else {
        alert.show("Some error occured");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };

  const handleUpdateUser = async () => {
    console.log(editedName, editedEmail, editedRole);
    try {
      await UpdateUserSchema.validateAsync({
        name: editedName,
        email: editedEmail,
      });
      setLoading(true);
      const res = await editUser(user.id, editedName, editedEmail, editedRole);
      setLoading(false);
      if (res.success) {
        alert.show("User updated succesfully");
        await getAllUsers();
      } else {
        alert.show("Some error occured");
      }
      setIsEditMode(false);
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };
  const handleUpdateCancelUser = () => {
    setIsEditMode(false);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedRole(user.role);
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
            <Button type="primary" onClick={handleEditUser}>
              Edit
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="success" onClick={handleUpdateCancelUser}>
              Cancel
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="primary" onClick={handleUpdateUser}>
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
