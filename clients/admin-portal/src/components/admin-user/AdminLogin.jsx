import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../API/admin.js';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { setAdminToken } from '../../shared/adminAuth.js';

const AdminLogin = ({ setAdminRole, setAdminId, setStateToken  }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [adminLoginFormData, setAdminLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const loginData = await adminLogin(adminLoginFormData);
            console.log('Admin Login >--(login)-->', loginData);

            // if loginData.adminData.user_role !== site_admin || != super_admin --> set error that access is DENIED
            if (loginData.userDetails.user_role === 'super_admin' || loginData.userDetails.user_role === 'site_admin') {
                setAdminRole(loginData.userDetails.user_role);
                setAdminId(loginData.userDetails.id);
           
                if (loginData.token) {
                    setAdminToken(loginData.token);
                   
                }
                navigate('/home');
            } else {
                setError('Access Denied');
            }
        } catch (error) {
            console.error(error);
        }

        setAdminLoginFormData({
            email: '',
            password: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target.value);
        setAdminLoginFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 8 }}>
                <Typography variant='h3' gutterBottom>
                    Chic Haven Admin
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name='email'
                        label='Email'
                        type='email'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={handleChange}
                        value={adminLoginFormData.email}
                        sx={{ 
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                                backgroundColor: '#F9F5E3' // Ensure background color matches theme on focus
                            },
                        }}
                    />
                    <TextField
                        name='password'
                        label='Password'
                        type='password'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={handleChange}
                        value={adminLoginFormData.password}
                        sx={{ 
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                                backgroundColor: '#F9F5E3' // Ensure background color matches theme on focus
                            },
                        }}
                    />
                    {error && (
                        <Typography color='error' variant='body2' sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AdminLogin;

