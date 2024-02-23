import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Divider, Grid, Typography, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Admission = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [isMounted, setIsMounted] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5678/Addmission');
        console.log('Response from backend:', response.data);

        // Assuming the data structure is { admissions: [...] }
        const admissions = response.data.admissions || [];
        setFormDataList(admissions);
      } catch (error) {
        console.error('Error fetching form data:', error);

        if (error.response && error.response.data && error.response.data.error) {
          console.error('Server Error:', error.response.data.error);
        } else {
          console.error('Error fetching data. Please try again.');
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the data with the specified ID
      await axios.delete(`http://localhost:5678/Addmission/${id}`);
      
      // Update the state to reflect the deletion
      setFormDataList((prevData) => prevData.filter(formData => formData._id !== id));
    } catch (error) {
      console.error('Error deleting form data:', error);

      if (error.response && error.response.data && error.response.data.error) {
        console.error('Server Error:', error.response.data.error);
      } else {
        console.error('Error deleting data. Please try again.');
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Admission Data" />
          <Divider />
          <CardContent>
            {formDataList.length > 0 ? (
              <TableContainer>
                <Table aria-label="admission data table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parent Name</TableCell>
                      <TableCell>Child Name</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Current School</TableCell>
                      <TableCell>Grade Applying For</TableCell>
                      <TableCell>Preferred Start Date</TableCell>
                      <TableCell>Questions/Comments</TableCell>
                      <TableCell>How Did You Hear About Us</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Delete</TableCell> {/* New cell for Delete action */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formDataList.map((formData) => (
                      <TableRow key={formData._id}>
                        <TableCell>{`${formData.parentFirstName} ${formData.parentLastName}`}</TableCell>
                        <TableCell>{`${formData.childFirstName} ${formData.childLastName}`}</TableCell>
                        <TableCell>{`${formData.dateOfBirth.split('T')[0]}`}</TableCell>
                        <TableCell>{`${formData.gender}`}</TableCell>
                        <TableCell>{`${formData.currentSchool}`}</TableCell>
                        <TableCell>{`${formData.gradeApplyingFor}`}</TableCell>
                        <TableCell>{`${formData.preferredStartDate.split('T')[0]}`}</TableCell>
                        <TableCell>{`${formData.questionsComments}`}</TableCell>
                        <TableCell>{`${formData.howDidYouHearAboutUs}`}</TableCell>
                        <TableCell>{`${formData.address}`}</TableCell>
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

export default Admission;
