import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Divider, Grid, Typography,Button } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Enquiry = () => {
  const [formDataList, setFormDataList] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5678/enquiry');
      console.log('Response from backend:', response.data);

      // Assuming the data structure is { enquiry: [...] }
  
      setFormDataList(response.data.contacts); // <-- Here's the issue
    } catch (error) {
      console.error('Error fetching form data:', error);
      // Error handling
    }
  };

  fetchData();
}, []);
 
  
  
  
  // Empty dependency array ensures useEffect runs only once, similar to componentDidMount
  
  
  
  
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to your backend API to delete the entry with the specified id
      await axios.delete(`http://localhost:5678/enquiry/${id}`);

      // Update the state to reflect the changes
      setFormDataList((prevData) => prevData.filter((formData) => formData._id !== id));
    } catch (error) {
      console.error('Error deleting form data:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Enquiry Data" />
          <Divider />
          <CardContent>
            {formDataList.length > 0 ? (
              <TableContainer>
                <Table aria-label="enquiry data table">
                  <TableHead>
                    <TableRow>
                      <TableCell>UserName</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Childname</TableCell>
                      <TableCell>ChildGrade</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formDataList.map((formData) => (
                      <TableRow key={formData._id}>
                        <TableCell>{formData.username}</TableCell>
                        <TableCell>{formData.email}</TableCell>
                        <TableCell>{formData.mobile}</TableCell>
                        <TableCell>{formData.Address}</TableCell>
                        <TableCell>{formData.state}</TableCell>
                        <TableCell>{formData.childname}</TableCell>
                        <TableCell>{formData.childgrade}</TableCell>
                        <TableCell>{formData.message}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(formData._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No data available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Enquiry;
