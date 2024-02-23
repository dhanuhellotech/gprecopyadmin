import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Newsletter = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedDetails, setUploadedDetails] = useState([]);
  const [editingPDFId, setEditingPDFId] = useState(null);
  const [newFilename, setNewFilename] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

 // Inside updateNewsletterById function
 const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdf', file);
    formData.append('newFilename', newFilename); // Append new filename to formData
    
    if (editingPDFId) {
      // If editing, send a request to update the existing PDF
      await axios.put(`http://localhost:5678/newsletter/${editingPDFId}`, formData);
      setEditingPDFId(null); // Reset editing state
    } else {
      // If not editing, send a request to create a new PDF
      const response = await axios.post('http://localhost:5678/newsletter/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Upon successful creation, update state to display the new PDF name
      const { filename } = response.data;
      setUploadedDetails([...uploadedDetails, { title, description, filename }]); // Update state with new PDF details
    }

    clearForm();
    fetchUploadedDetails();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to upload PDF.');
  }
};



  const fetchUploadedDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5678/newsletter');
      setUploadedDetails(response.data);
    } catch (error) {
      console.error('Error fetching uploaded details:', error);
    }
  };

  useEffect(() => {
    fetchUploadedDetails();
  }, []); // Fetch uploaded details when component mounts

  const handleDeletePDF = async (id) => {
    try {
      await axios.delete(`http://localhost:5678/newsletter/${id}`);
      fetchUploadedDetails();
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  const handleEditPDF = (id) => {
    // Find the PDF details by ID
    const pdfToEdit = uploadedDetails.find(pdf => pdf._id === id);
    if (pdfToEdit) {
      // Populate form fields with the existing data
      setTitle(pdfToEdit.title);
      setDescription(pdfToEdit.description);
      setEditingPDFId(id); // Set the PDF ID being edited
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditingPDFId(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload PDF
      </Typography>
      <form onSubmit={handleFormSubmit}>
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
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Grid item xs={12}>
  <TextField
    label="New Filename"
    variant="outlined"
    fullWidth
    value={newFilename}
    onChange={(e) => setNewFilename(e.target.value)} // Handle new filename input change
  />
</Grid> 
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editingPDFId ? 'Update' : 'Upload'}
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Uploaded PDFs
      </Typography>
      <List>
        {uploadedDetails.map((detail, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={detail.title}
                secondary={detail.description}
              />
              <ListItemText primary={detail.filename} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePDF(detail._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPDF(detail._id)}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Newsletter;
