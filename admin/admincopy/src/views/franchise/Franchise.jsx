import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, Divider, Grid, Typography, Button } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Franchise = () => {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5678/franschise');
        console.log('Response from backend:', response.data);

        // Assuming the data structure is { franchises: [...] }
        const franschises = response.data.franschise || [];
        setFormDataList(franschises);
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
      // Make a DELETE request to your backend endpoint to delete the franchise with the specified id
      await axios.delete(`http://localhost:5678/franschise/${id}`);

      // Update the state after successful deletion
      setFormDataList((prevData) => prevData.filter((franschise) => franschise._id !== id));
    } catch (error) {
      console.error('Error deleting franchise:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Franchise Data" />
          <Divider />
          <CardContent>
            {formDataList.length > 0 ? (
              <TableContainer>
                <Table aria-label="franschise data table">
                  <TableHead>
                    <TableRow>
                      <TableCell>UserName</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Comments</TableCell>
                      <TableCell>investment</TableCell>
                      <TableCell>yesOrNo</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formDataList.map((formData) => (
                      <TableRow key={formData._id}>
                        <TableCell>{formData.username}</TableCell>
                        <TableCell>{formData.email}</TableCell>
                        <TableCell>{formData.mobile}</TableCell>
                        <TableCell>{formData.state}</TableCell>
                        <TableCell>{formData.City}</TableCell>
                        <TableCell>{formData.Comments}</TableCell>
                        <TableCell>{formData.investment}</TableCell>
                        <TableCell>{formData.yesOrNo}</TableCell>
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

export default Franchise;
