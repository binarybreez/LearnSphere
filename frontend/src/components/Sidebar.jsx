import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';



const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Progress', icon: <TrendingUpIcon />, path: '/progress' },
  { text: 'Add Course', icon: <AddCircleOutlineIcon />, path: '/add-course' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
];

const Sidebar = ({ open, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <>
      <IconButton onClick={onToggle} sx={{ color: 'white', justifyContent: open ? 'flex-end' : 'center', width: '100%', padding: 2 }}>
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ opacity: open ? 1 : 0, color: 'white' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240, 
              backgroundColor: 'secondary.main'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            '& .MuiDrawer-paper': { 
              position: 'relative',
              whiteSpace: 'nowrap',
              width: open ? 240 : theme.spacing(7),
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              boxSizing: 'border-box',
              backgroundColor: 'secondary.main',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

