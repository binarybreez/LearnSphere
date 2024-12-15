'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
} from '@mui/material';

const durations = ['1 week', '2 weeks', '4 weeks', '8 weeks', '12 weeks'];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const subjects = ['Math', 'Science', 'History', 'Literature', 'Computer Science'];

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    instructorName: 'John Doe', // Assuming this is pre-filled
    difficultyLevel: '',
    subject: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    duration: false,
    instructorName: false,
    difficultyLevel: false,
    subject: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      title: formData.title === '',
      description: formData.description === '',
      duration: formData.duration === '',
      instructorName: formData.instructorName === '',
      difficultyLevel: formData.difficultyLevel === '',
      subject: formData.subject === '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      // Form is valid, submit the data
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Course
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              name="title"
              label="Course Title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              helperText={errors.title ? 'Course title is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Course Description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              helperText={errors.description ? 'Course description is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              id="duration"
              name="duration"
              label="Course Duration"
              value={formData.duration}
              onChange={handleChange}
              error={errors.duration}
              helperText={errors.duration ? 'Please select a duration' : ''}
            >
              {durations.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="instructorName"
              name="instructorName"
              label="Instructor Name"
              value={formData.instructorName}
              onChange={handleChange}
              error={errors.instructorName}
              helperText={errors.instructorName ? 'Instructor name is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              id="difficultyLevel"
              name="difficultyLevel"
              label="Difficulty Level"
              value={formData.difficultyLevel}
              onChange={handleChange}
              error={errors.difficultyLevel}
              helperText={errors.difficultyLevel ? 'Please select a difficulty level' : ''}
            >
              {difficultyLevels.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              id="subject"
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              helperText={errors.subject ? 'Please select a subject' : ''}
            >
              {subjects.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

