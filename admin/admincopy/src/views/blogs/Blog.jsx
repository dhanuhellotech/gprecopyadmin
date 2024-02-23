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
  Select,
  MenuItem,
  CardMedia
} from '@material-ui/core';

const Blog = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState(0);
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('http://localhost:5678/blogs') // Replace with your actual backend endpoint
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('category', category);
      formData.append('author', author);
      formData.append('comments', comments);
      formData.append('content', content);
      formData.append('link', link);
      formData.append('image', imageFile);

      if (editingBlogId) {
        // If editing, send a request to update the existing blog
        await axios.put(`http://localhost:5678/blogs/${editingBlogId}`, formData);
        setEditingBlogId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new blog
        await axios.post('http://localhost:5678/blogs', formData);
      }

      clearForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

 
  
  const handleEditBlog = (blogId) => {
    const blogToEdit = blogs.find(blog => blog._id === blogId);
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setDate(blogToEdit.date);
      setCategory(blogToEdit.category);
      setAuthor(blogToEdit.author);
      setComments(blogToEdit.comments);
      setContent(blogToEdit.content);
      setLink(blogToEdit.link);
      setEditingBlogId(blogToEdit._id); // Set the blog ID being edited
    }
  };
  
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5678/blogs/${blogId}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }
  const clearForm = () => {
    setTitle('');
    setDate('');
    setCategory('');
    setAuthor('');
    setComments(0);
    setContent('');
    setLink('');
    setImageFile(null);
    setEditingBlogId(null);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Blog Admin Panel
        </Typography>
        <form method="post" action="/your-upload-endpoint" enctype="multipart/form-data">
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
              <TextField
                label="date"
                variant="outlined"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Comments"
                type="number"
                variant="outlined"
                fullWidth
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={3}
                placeholder="Content"
                style={{ width: '100%', resize: 'none' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Add Blog
            </Button>
       
      
          </Grid>
          </Grid>
        </form>
      </Paper>
      {/* Display existing blogs */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Existing Blogs
      </Typography>
      <Grid container spacing={2}>
        {blogs.map(blog => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Paper elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
              <Typography variant="h6" gutterBottom>
                {blog.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {blog.category}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {blog.author}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {blog.content}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {blog.link}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {blog.date}
              </Typography>
              <CardMedia
                component="img"
                alt={blog.title}
                height="200px"
                width="100px" 
                // Set your preferred height
                image={`http://localhost:5678/${blog.imageUrl}`}
              />
                  <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteBlog(blog._id)}
                style={{ marginTop: '10px' }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditBlog(blog._id)}
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
  
export default Blog;
