import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authMiddleware } from '../utils/auth';
import axios from 'axios'
import { BACKEND_URL, LOCAL_BACKEND_URL } from '../utils/vars';
import { AppBar, Avatar, Box, CircularProgress, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Account from '../components/Account';
import Todo from '../components/Todo';

const drawerWidth = 240
const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  toolbar: theme.mixins.toolbar
});

const Home = ({ classes = styles }) => {
  const navigate = useNavigate()

  const [render, setRender] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState('')
  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [uiLoading, setUiLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const loadAccountPage = event => {
    console.log("load account page")
    setRender(true)
  }
  const loadTodoPage = event => {
    console.log("load todo page")
    setRender(false)
  }
  const logoutHandler = event => {
    localStorage.removeItem('AuthToken')
    navigate('/login')
  }

  useEffect(() => {
    authMiddleware(navigate)
    const authToken = localStorage.getItem('AuthToken')
    axios.defaults.headers.common = { Authorization: `${authToken}` }
    axios.get(`${LOCAL_BACKEND_URL}/user`)
      .then(res => {
        console.log(res.data)
        setFirstName(res.data.userCredentials.firstName)
        setLastName(res.data.userCredentials.lastName)
        setEmail(res.data.userCredentials.email)
        setPhoneNumber(res.data.userCredentials.phoneNumber)
        setCountry(res.data.userCredentials.country)
        setUsername(res.data.userCredentials.username)
        setUiLoading(false)
        setProfilePicture(res.data.userCredentials.imageUrl)
      })
      .catch(error => {
        if (error.response.status === 403) {
          navigate('/login')
        }
        console.log(error)
        setErrorMsg('Error in retrieving data')
      })
  }, [])

  return (
    <>
      {uiLoading ?
        <Box sx={classes.root}>
          {uiLoading && <CircularProgress size={150} sx={classes.uiProgess} />}
        </Box> :
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' noWrap>
                TodoApp
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            open={false}
            sx={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div sx={classes.toolbar} />
            <Divider />
            <center>
              <Avatar
                src={profilePicture}
                sx={classes.avatar}
              />
              <p>
                {' '}
                {firstName} {lastName}
              </p>
            </center>
            <Divider />
            <List>
              <ListItem button key="Todo" onClick={loadTodoPage}>
                <ListItemIcon>
                  {' '}
                  <NotesIcon /> {' '}
                </ListItemIcon>
                <ListItemText primary="Todo" />
              </ListItem>
              <ListItem button key="Account" onClick={loadAccountPage}>
                <ListItemIcon>
                  {' '}
                  <AccountBoxIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>

              <ListItem button key="Logout" onClick={logoutHandler}>
                <ListItemIcon>
                  {' '}
                  <ExitToAppIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>
            {render ? <Account /> : <Todo />}
          </Box>
        </Box>}
    </>
  )
}

export default Home