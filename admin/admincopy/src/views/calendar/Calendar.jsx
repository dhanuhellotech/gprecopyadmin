import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  TextareaAutosize,
  Container,
  Typography,
  Grid,
  Paper,
  MenuItem
} from '@material-ui/core';

const Calendar = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('Event');
  const [description, setDescription] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null); // Added state for editing event ID

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = () => {
    axios.get('http://localhost:5678/calendar')
      .then(response => setCalendarEvents(response.data))
      .catch(error => console.error('Error fetching calendar events:', error));
  };

  const handleFormSubmit = async () => {
    try {
      if (editingEventId) {
        // If editing, send a request to update the existing event
        await axios.put(`http://localhost:5678/calendar/${editingEventId}`, {
          title,
          date,
          eventType,
          description,
        });
        setEditingEventId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new event
        await axios.post('http://localhost:5678/calendar', {
          title,
          date,
          eventType,
          description,
        });
      }

      clearForm();
      fetchCalendarEvents();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5678/calendar/${id}`);
      fetchCalendarEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (id) => {
    // Find the event to edit from the calendarEvents array
    const eventToEdit = calendarEvents.find(event => event._id === id);
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setEventType(eventToEdit.eventType);
      setDescription(eventToEdit.description);
      setEditingEventId(eventToEdit._id); // Set the ID of the event being edited
    }
  };

  const clearForm = () => {
    setTitle('');
    setDate('');
    setEventType('Event');
    setDescription('');
    setEditingEventId(null);
  };

  return (
    <Container>
      {/* Form for creating/updating events */}
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Create or Edit Calendar Event
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Event Type"
                select
                variant="outlined"
                fullWidth
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="Event">Event</MenuItem>
                <MenuItem value="Important Day">Important Day</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={3}
                placeholder="Description"
                style={{ width: '100%', resize: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                {editingEventId ? 'Update Event' : 'Create Event'} {/* Change button text based on edit mode */}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Display existing calendar events */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Calendar Events
      </Typography>
      <Grid container spacing={2}>
        {calendarEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Paper elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
              <Typography variant="h6" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Event Type: {event.eventType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {event.description}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteEvent(event._id)}>
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleEditEvent(event._id)}>
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Calendar;
