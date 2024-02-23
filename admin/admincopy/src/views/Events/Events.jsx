import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, TextareaAutosize, Container, Typography, Grid, Paper, Select, MenuItem, Card, CardContent, CardMedia } from '@material-ui/core';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5678/events/getAll')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:5678/events/delete/${eventId}`);
      console.log('Response:', response.data);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', imageFile);
      formData.append('category', selectedCategory);
  
      const response = await axios.post('http://localhost:5678/events/create', formData);
  
      console.log('Response:', response.data);
  
      clearForm();
      fetchEvents();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImageFile(null);
    setSelectedCategory('');
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Admin Events
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextareaAutosize
                minRows={3}
                placeholder="Description"
                style={{ width: '100%', resize: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="" disabled>Select a Category</MenuItem>
                <MenuItem value="ANNUAL_DAY">Annual Day</MenuItem>
                <MenuItem value="SPORTS_DAY">Sports Day</MenuItem>
                <MenuItem value="REPUBLIC_DAY">Republic Day</MenuItem>
                <MenuItem value="CHILDRENS_DAY">Children's Day</MenuItem>
                <MenuItem value="TEACHERS_DAY">Teachers Day</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                Add Event
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Events
        </Typography>

        <Grid container spacing={2}>
          {events.map(event => (
            <Grid item xs={12} md={4} key={event._id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={event.title}
                  height="100%"
                  width="100%"
                  image={`http://localhost:5678/${event.imageUrl}`}
                />
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{event.category}</Typography>
                  <Typography variant="body2" color="textSecondary">{event.description}</Typography>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(event._id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Events;
