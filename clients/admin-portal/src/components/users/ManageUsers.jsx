import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminToken } from "../../shared/adminAuth";
import { fetchUserById, updateUser, deleteUser } from "../../API/users";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ManageUsers = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = getAdminToken();

  const [selectedUser, setSelectedUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    user_role: '',
    can_post_reviews: '',
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const fetchedUser = await fetchUserById(userId, token);
        console.log('Fetched User (ManageUser) -->', fetchedUser);
        setSelectedUser(fetchedUser);
        setUserFormData({
          first_name: fetchedUser.first_name || '',
          last_name: fetchedUser.last_name || '',
          email: fetchedUser.email || '',
          phone_number: fetchedUser.phone_number || '',
          user_role: fetchedUser.user_role || '',
          can_post_reviews: fetchedUser.can_post_reviews || '',
        });
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    if (userId) {
      getUserById();
    }
  }, [userId, token]);

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateUser(userId, userFormData, token);
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId, token);
      navigate('/users');
    } catch (error) {
      console.error('User Deletion Failed:', error);
    }
  };

  if (!selectedUser) {
    return (
      <Container>
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: 'center', mt: 0 }}>
          <Typography variant='h3'>{`${selectedUser.first_name} ${selectedUser.last_name}`}</Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              placeholder="Enter new first name"
              name="first_name"
              value={userFormData.first_name}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Last Name"
              placeholder="Enter new last name"
              name="last_name"
              value={userFormData.last_name}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Email"
              placeholder="Enter new email"
              name="email"
              value={userFormData.email}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Phone Number"
              placeholder="Enter new phone number"
              name="phone_number"
              value={userFormData.phone_number}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Role"
              placeholder="Enter new role"
              name="user_role"
              value={userFormData.user_role}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Can Post Reviews"
              placeholder="Enter true or false"
              name="can_post_reviews"
              value={userFormData.can_post_reviews}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageUsers;
