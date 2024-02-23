import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Grid, Paper, Card, CardContent, Select, MenuItem } from '@material-ui/core';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', time: '' }]);
  const [editingEntryId, setEditingEntryId] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = () => {
    axios.get('http://localhost:5678/getAll')
      .then(response => setTimetable(response.data))
      .catch(error => console.error('Error fetching timetable:', error));
  };

  const handleDelete = async (timetableId) => {
    try {
      const response = await axios.delete(`http://localhost:5678/delete/${timetableId}`);
      console.log('Response:', response.data);
      fetchTimetable();
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (editingEntryId) {
        // If editing an entry, send a request to update the existing entry
        const updatedEntry = { day, date, subjects };
        await axios.put(`http://localhost:5678/edit/${editingEntryId}`, updatedEntry);
        setEditingEntryId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new entry
        const newEntry = { day, date, subjects };
        await axios.post('http://localhost:5678/timetable', newEntry);
      }
      
      clearForm();
      fetchTimetable();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const clearForm = () => {
    setDay('');
    setDate('');
    setSubjects([{ subject: '', time: '' }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: '', time: '' }]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleEditEntry = (entryId) => {
    const entryToEdit = timetable.find(entry => entry._id === entryId);
    if (entryToEdit) {
      setDay(entryToEdit.day);
      setDate(entryToEdit.date);
      setSubjects(entryToEdit.subjects);
      setEditingEntryId(entryToEdit._id); // Set the entry ID being edited
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Timetable Management
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                labelId="day-label"
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Select Day</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            {subjects.map((subject, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    value={subject.subject}
                    onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Time"
                    variant="outlined"
                    fullWidth
                    value={subject.time}
                    onChange={(e) => handleSubjectChange(index, 'time', e.target.value)}
                  />
                </Grid>
                {index === subjects.length - 1 && (
                  <Grid item xs={12}>
                    <Button variant="outlined" color="primary" onClick={addSubject}>
                      Add Subject
                    </Button>
                  </Grid>
                )}
                {index !== 0 && (
                  <Grid item xs={12}>
                    <Button variant="outlined" color="secondary" onClick={() => removeSubject(index)}>
                      Remove Subject
                    </Button>
                  </Grid>
                )}
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                {editingEntryId ? 'Update Entry' : 'Add Entry'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Timetable Entries
        </Typography>

        <Grid container spacing={2}>
          {timetable.map(entry => (
            <Grid item xs={12} md={4} key={entry._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{entry.day}</Typography>
                  <Typography variant="body2" color="textSecondary">{entry.date}</Typography>
                  {entry.subjects.map((subject, index) => (
                    <div key={index}>
                      <Typography variant="body2" color="textSecondary">Subject: {subject.subject}</Typography>
                      <Typography variant="body2" color="textSecondary">Time: {subject.time}</Typography>
                    </div>
                  ))}
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(entry._id)}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEditEntry(entry._id)}>
                    Edit
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

export default TimeTable;
