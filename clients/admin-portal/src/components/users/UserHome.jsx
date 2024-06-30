
import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../../API/users";
import { getAdminToken } from "../../shared/adminAuth";
import { Box, Container, Divider, List, TextField } from "@mui/material";
import UserList from "./UserList";

const UsersHome = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const token = getAdminToken()


    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchAllUsers(token);
                console.log('Users (UsersHome) -->', fetchedUsers);
                setUsers(fetchedUsers);
                
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        getUsers();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase(); 
        const filterList = users.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        setFilteredUsers(filterList);
    };

    return (
        <Container>
            <Box sx={{ padding: 1, position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#9A8C98' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    onChange={handleSearch}
                    sx={{
                        color: '#22223B',
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                            backgroundColor: '#F9F5E3',
                            color: '#22223B',
                        },
                    }}
                />
            </Box>
            <Box sx={{ pt: 2 }}>
                <List sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {filteredUsers.map(user => (
                        <UserList key={user.id} user={user} />
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default UsersHome;
