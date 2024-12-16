'use client'

import React from 'react';
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  LinearProgress,
} from '@mui/material';
import axios from "axios";
// Dummy data for courses and progress
const courses = [
  { id: 1, title: 'Introduction to React', status: 'Completed' },
  { id: 2, title: 'Advanced JavaScript', status: 'Completed' },
  { id: 3, title: 'Node.js Fundamentals', status: 'Ongoing' },
  { id: 4, title: 'Data Structures and Algorithms', status: 'Ongoing' },
];

const userProgress = {
  completedCourses: 2,
  totalCourses: 4,
  progressPercentage: 50,
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/profile")
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/api/courses")
    .then((response) => {
      setCourses(response.data);
    })
    .catch((error) => {
      console.error("Error fetching courses:", error);
    });
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
                alt="John Doe"
                src="/placeholder.svg"
              />
              <Typography variant="h4" gutterBottom>
                {user.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body2" color="primary">
                {user.role}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={userProgress.progressPercentage} 
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'grey.300',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: 'primary.main',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${userProgress.progressPercentage}%`}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {`${userProgress.completedCourses} of ${userProgress.totalCourses} courses completed`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Courses
          </Typography>
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} key={course.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/placeholder.svg"
                    alt={course.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {course.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;

