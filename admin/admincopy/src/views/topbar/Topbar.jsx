import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Grid, Paper, Card, CardContent } from '@material-ui/core';

const Tobbar = () => {
  const [tobbar, setTobbar] = useState([]);
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [schoolOpenTiming, setSchoolOpenTiming] = useState('');
  const [editingEntryId, setEditingEntryId] = useState(null);

  useEffect(() => {
    fetchTobbar();
  }, []);

  const fetchTobbar = () => {
    axios.get('http://localhost:5678')
      .then(response => setTobbar(response.data))
      .catch(error => console.error('Error fetching tobbar:', error));
  };

  const handleDelete = async (tobbarId) => {
    try {
      const response = await axios.delete(`http://localhost:5678/${tobbarId}`);
      console.log('Response:', response.data);
      fetchTobbar();
    } catch (error) {
      console.error('Error deleting tobbar entry:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const newTobbar = {
        number: number,
        location: location,
        schoolOpenTiming: schoolOpenTiming
      };

      if (editingEntryId) {
        // If editing an entry, send a request to update the existing entry
        await axios.put(`http://localhost:5678/${editingEntryId}`, newTobbar);
        setEditingEntryId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new entry
        await axios.post('http://localhost:5678', newTobbar);
      }

      clearForm();
      fetchTobbar();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditEntry = (entryId) => {
    const entryToEdit = tobbar.find(entry => entry._id === entryId);
    if (entryToEdit) {
      setNumber(entryToEdit.number);
      setLocation(entryToEdit.location);
      setSchoolOpenTiming(entryToEdit.schoolOpenTiming);
      setEditingEntryId(entryToEdit._id); // Set the entry ID being edited
    }
  };

  const clearForm = () => {
    setNumber('');
    setLocation('');
    setSchoolOpenTiming('');
    setEditingEntryId(null);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Tobbar Management
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Number"
                variant="outlined"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="School Open Timing"
                variant="outlined"
                fullWidth
                value={schoolOpenTiming}
                onChange={(e) => setSchoolOpenTiming(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                {editingEntryId ? 'Update Tobbar' : 'Add Tobbar'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Tobbar Entries
        </Typography>

        <Grid container spacing={2}>
          {tobbar.map(entry => (
            <Grid item xs={12} md={4} key={entry._id}>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">Number: {entry.number}</Typography>
                  <Typography variant="body2" color="textSecondary">Location: {entry.location}</Typography>
                  <Typography variant="body2" color="textSecondary">School Open Timing: {entry.schoolOpenTiming}</Typography>

                  <Button variant="outlined" color="primary" onClick={() => handleEditEntry(entry._id)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(entry._id)}>
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

export default Tobbar;
