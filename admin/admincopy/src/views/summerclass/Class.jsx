
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';

const Class = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [staffName, setStaffName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5678/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gameName', gameName);
      formData.append('price', price);
      formData.append('staffName', staffName);
      formData.append('image', imageFile);

      if (editingClassId) {
        await axios.put(`http://localhost:5678/classes/${editingClassId}`, formData);
        setEditingClassId(null);
      } else {
        await axios.post('http://localhost:5678/classes', formData);
      }

      clearForm();
      fetchClasses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditClass = (classId) => {
    const classToEdit = classes.find(cls => cls._id === classId);
    if (classToEdit) {
      setName(classToEdit.name);
      setAge(classToEdit.age);
      setGameName(classToEdit.gameName);
      setPrice(classToEdit.price);
      setStaffName(classToEdit.staffName);
      setEditingClassId(classToEdit._id);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:5678/classes/${classId}`);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setAge('');
    setGameName('');
    setPrice('');
    setStaffName('');
    setImageFile(null);
    setEditingClassId(null);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Class Admin Panel
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="gameName"
                variant="outlined"
                fullWidth
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="staffName"
                variant="outlined"
                fullWidth
                value={staffName}
                onChange={(e) =>  setStaffName(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                label="classes"
                variant="outlined"
                fullWidth
                value={classes}
                onChange={(e) =>   setClasses(e.target.value)}
              />
            </Grid> */}

            {/* Add other input fields for age, gameName, price, staffName */}
            <Grid item xs={12} md={6}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                Add Class
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* Display existing classes */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Existing Classes
      </Typography>
      <Grid container spacing={2}>
        {classes.map(cls => (
          <Grid item xs={12} sm={6} md={4} key={cls._id}>
            <Paper elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
            <Typography variant="h6" gutterBottom>
          Name: {cls.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Age: {cls.age}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Game Name: {cls.gameName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: {cls.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Staff Name: {cls.staffName}
        </Typography>
        <img src={`http://localhost:5678/${cls.imageUrl}`} alt={cls.name} style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
        {/* Display other class properties */}
              {/* Display other class properties */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteClass(cls._id)}
                style={{ marginTop: '10px' }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditClass(cls._id)}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Class;