'use client'

import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import theme from './theme'
import Sidebar from '../components/Sidebar'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleSidebar}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  TechPro
                </Typography>
              </Toolbar>
            </AppBar>
            <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                marginLeft: { sm: sidebarOpen ? 240 : 56 },
                width: { sm: `calc(100% - ${sidebarOpen ? 240 : 56}px)` },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Toolbar /> {/* This toolbar is for spacing below the AppBar */}
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}

