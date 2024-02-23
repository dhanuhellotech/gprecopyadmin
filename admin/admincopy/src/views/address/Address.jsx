import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, TextareaAutosize, Container, Typography, Grid } from '@material-ui/core';

const Address = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5678/api/addresses/${id}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      email: address.email,
      phone: address.phone,
      address: address.address,
    });
    setEditFormData({
      ...formData, // include the current values
      id: address._id, // Remember the ID for editing
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (editFormData) {
        // If editing, update only the fields that are changed
        const updatedFormData = {
          email: formData.email || editFormData.email,
          phone: formData.phone || editFormData.phone,
          address: formData.address || editFormData.address,
          id: editFormData.id,
        };
  
        const response = await axios.put(`http://localhost:5678/api/addresses/${updatedFormData.id}`, updatedFormData);
        console.log('Address updated:', response.data);
      } else {
        // If not editing, send a request to create a new address
        const response = await axios.post('http://localhost:5678/api/addresses', formData);
        console.log('Address created:', response.data);
      }
  
      setFormData({ email: '', phone: '', address: '' });
      setEditFormData(null);
      fetchAddresses();
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };
  
  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:5678/api/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Admin Panel - Add Address
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextareaAutosize
              minRows={3}
              placeholder="Address"
              style={{ width: '100%', resize: 'none' }}
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Address
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12} mt={10}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Display Addresses
          </Typography>
          <ul>
            {addresses.map((address) => (
              <li key={address._id}>
                <strong>Email:</strong> {address.email}, <strong>Phone:</strong> {address.phone}, <strong>Address:</strong> {address.address}

                <Button color="primary" onClick={() => handleEdit(address)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDelete(address._id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </Grid>
    </Container>
  );
};

export default Address;
