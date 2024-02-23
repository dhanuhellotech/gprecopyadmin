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
  CardMedia,
  Input
} from '@material-ui/core';

const Teacher = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [hobby, setHobby] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [degree, setDegree] = useState('');
  const [teachingGoal, setTeachingGoal] = useState('');
  const [position, setPosition] = useState('');
  const [homeTown, setHomeTown] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    axios.get('http://localhost:5678/teachers') // Replace with your actual backend endpoint
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teachers:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('hobby', hobby);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('degree', degree);
      formData.append('teachingGoal', teachingGoal);
      formData.append('position', position);
      formData.append('homeTown', homeTown);
      formData.append('image', imageFile);
  
      if (editingTeacherId) {
        // If editing, send a request to update the existing teacher
        await axios.put(`http://localhost:5678/teachers/${editingTeacherId}`, formData);
        setEditingTeacherId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new teacher
        await axios.post('http://localhost:5678/teachers', formData);
      }
  
      clearForm();
      fetchTeachers();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const handleEditTeacher = (teacherId) => {
    const teacherToEdit = teachers.find(teacher => teacher._id === teacherId);
    if (teacherToEdit) {
      setName(teacherToEdit.name);
      setAbout(teacherToEdit.about);
      setHobby(teacherToEdit.hobby);
      setDateOfBirth(teacherToEdit.dateOfBirth);
      setDegree(teacherToEdit.degree);
      setTeachingGoal(teacherToEdit.teachingGoal);
      setPosition(teacherToEdit.position);
      setHomeTown(teacherToEdit.homeTown);
      setEditingTeacherId(teacherToEdit._id); // Set the teacher ID being edited
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:5678/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setAbout('');
    setHobby('');
    setDateOfBirth('');
    setDegree('');
    setTeachingGoal('');
    setPosition('');
    setHomeTown('');
    setImageFile(null);
    setEditingTeacherId(null);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Teacher Admin Panel
        </Typography>
        <form method="post" action="/your-upload-endpoint" enctype="multipart/form-data">
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
                label="About"
                variant="outlined"
                fullWidth
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Hobby"
                variant="outlined"
                fullWidth
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              type="date"
                // label="Date of Birth"
                variant="outlined"
                fullWidth
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="position"
                variant="outlined"
                fullWidth
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="hometown"
                variant="outlined"
                fullWidth
                value={homeTown}
                onChange={(e) => setHomeTown(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Degree"
                variant="outlined"
                fullWidth
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teaching Goal"
                variant="outlined"
                fullWidth
                value={teachingGoal}
                onChange={(e) => setTeachingGoal(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                {editingTeacherId ? 'Update Teacher' : 'Add Teacher'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {/* Display existing teachers */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Existing Teachers
      </Typography>
      <Grid container spacing={2}>
        {teachers.map(teacher => (
          <Grid item xs={12} sm={6} md={4} key={teacher._id}>
            <Paper elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
              <Typography variant="h6" gutterBottom>
                Name: {teacher.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                About: {teacher.about}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Hobby: {teacher.hobby}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Date of Birth: {teacher.dateOfBirth}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Degree: {teacher.degree}
              </Typography>
              <Typography variant="h6" gutterBottom>
           position: {teacher.position}
              </Typography>
              <Typography variant="h6" gutterBottom>
             HomeTown: {teacher.homeTown}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Teaching Goal: {teacher.teachingGoal}
              </Typography>
              <CardMedia
                component="img"
                alt={teacher.title}
                height="200px"
                width="100px" 
                // Set your preferred height
                image={`http://localhost:5678/${teacher.imageUrl}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteTeacher(teacher._id)}
                style={{ marginTop: '10px' }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditTeacher(teacher._id)}
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

export default Teacher;
