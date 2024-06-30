import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box, ListItem, Divider, Container, Typography } from "@mui/material";

const UserList = ({ user }) => {
    console.log('User >--(UserList)-->', user)
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/users/${user.id}/edit`); 
    };

    return (
        <Container>
            <Divider />
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h6' noWrap>{`${user.first_name} ${user.last_name}`}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                </Box>
                <Button variant="contained" onClick={handleEdit} sx={{ color: '#22223B', borderRadius: '2px' }}>
                    Edit
                </Button>
            </ListItem>
        </Container>
    );
};

export default UserList;

