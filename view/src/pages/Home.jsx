import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authMiddleware } from '../utils/auth';
import axios from 'axios'
import { BACKEND_URL } from '../utils/vars';

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
 const [profilePicture, setProfilePicture] = useState('')
 const [uiLoading, setUiLoading] = useState(true)
 const [imageLoading, setImageLoading] = useState(false)

 const loadAccountPage = event => {
  setRender(true)
 }
 const loadTodoPage = event => {
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
  axios.get(`${BACKEND_URL}/user`)
   .then(res => {
    console.log(res.data)
   })
 }, [])

 return (
  <div>Home</div>
 )
}

export default Home