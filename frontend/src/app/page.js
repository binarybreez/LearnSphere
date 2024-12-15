'use client'

import React from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechPro
          </Typography>
          <Button color="inherit" component={Link} href="/login">Login</Button>
          <Button color="inherit" component={Link} href="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 8, mb: 2, flex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to TechPro
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
            Revolutionizing the way you work with cutting-edge technology
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          {[1, 2, 3].map((feature) => (
            <Grid item key={feature} xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Feature {feature}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-Action */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h3" gutterBottom>
            Ready to get started?
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} href="/signup">
            Sign Up Now
          </Button>
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            © 2024 TechPro. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

