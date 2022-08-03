import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authMiddleware } from '../utils/auth';
import { LOCAL_BACKEND_URL } from '../utils/vars';
const styles = (theme) => ({
 content: {
  flexGrow: 1,
  padding: theme.spacing(3)
 },
 toolbar: theme.mixins.toolbar,
 root: {},
 details: {
  display: 'flex'
 },
 avatar: {
  height: 110,
  width: 100,
  flexShrink: 0,
  flexGrow: 0
 },
 locationText: {
  paddingLeft: '15px'
 },
 buttonProperty: {
  position: 'absolute',
  top: '50%'
 },
 uiProgess: {
  position: 'fixed',
  zIndex: '1000',
  height: '31px',
  width: '31px',
  left: '50%',
  top: '35%'
 },
 progess: {
  position: 'absolute'
 },
 uploadButton: {
  marginLeft: '8px',
  margin: theme.spacing(1)
 },
 customError: {
  color: 'red',
  fontSize: '0.8rem',
  marginTop: 10
 },
 submitButton: {
  marginTop: '10px'
 }
});
const Account = ({ classes = styles }) => {
 const [firstName, setFirstName] = useState('')
 const [lastName, setLastName] = useState('')
 const [email, setEmail] = useState('')
 const [phoneNumber, setPhoneNumber] = useState('')
 const [username, setUsername] = useState('')
 const [country, setCountry] = useState('')
 const [profilePicture, setProfilePicture] = useState('')
 const [uiLoading, setUiLoading] = useState(true)
 const [buttonLoading, setButtonLoading] = useState(false)
 const [imageError, setImageError] = useState('')
 const [errorMsg, setErrorMsg] = useState('')

 const navigate = useNavigate()

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
   })
   .catch(error => {
    if (error.response.status === 403) {
     navigate('/login')
    }
    console.log(error)
    setErrorMsg('Error in retrieving data')
   })
 }, []);

 return (
  <div>Account</div>
 )
}

export default Account