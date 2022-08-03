import { Avatar, Button, CircularProgress, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LOCAL_BACKEND_URL } from '../utils/vars';

const styles = (theme) => ({
 paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
 },
 avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main
 },
 form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3)
 },
 submit: {
  margin: theme.spacing(3, 0, 2)
 },
 progress: {
  position: 'absolute'
 }
});

const Signup = ({ classes = styles }) => {
 const [firstName, setFirstName] = useState('')
 const [lastName, setLastName] = useState('')
 const [phoneNumber, setPhoneNumber] = useState('')
 const [country, setCountry] = useState('')
 const [username, setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [errors, setErrors] = useState([])
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()

 const handleSubmit = event => {
  event.preventDefault()
  setLoading(true)
  const newUserData = {
   firstName: firstName,
   lastName: lastName,
   phoneNumber: phoneNumber,
   country: country,
   username: username,
   email: email,
   password: password,
   confirmPassword: confirmPassword
  }
  axios.post(`${LOCAL_BACKEND_URL}/signup`, newUserData)
   .then(res => {
    localStorage.setItem('AuthToken', `${res.data.token}`)
    setLoading(false)
    navigate('/')
   })
   .catch(error => {
    setErrors(error.response.data)
    setLoading(false)
   })
 }

 const handleFirstNameChange = (event) => {
  setFirstName(event.target.value)
 }
 const handleLastNameChange = (event) => {
  setLastName(event.target.value)
 }
 const handlePhoneNumberChange = (event) => {
  setPhoneNumber(event.target.value)
 }
 const handleCountryChange = (event) => {
  setCountry(event.target.value)
 }
 const handleUsernameChange = (event) => {
  setUsername(event.target.value)
 }
 const handleEmailChange = (event) => {
  setEmail(event.target.value)
 }
 const handlePasswordChange = (event) => {
  setPassword(event.target.value)
 }
 const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value)
 }

 return (
  <Container component="main" maxWidth="xs">
   <CssBaseline />
   <div className={classes.paper}>
    <Avatar className={classes.avatar}>
     <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
     Sign Up
    </Typography>
    <form className={classes.form} noValidate>
     <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
       <TextField
        variant='outlined'
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete='firstName'
        helperText={errors.firstName}
        error={errors.firstName ? true : false}
        onChange={handleFirstNameChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        variant='outlined'
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete='lastName'
        helperText={errors.lastName}
        error={errors.lastName ? true : false}
        onChange={handleLastNameChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        variant='outlined'
        required
        fullWidth
        id="username"
        label="User Name"
        name="username"
        autoComplete='username'
        helperText={errors.username}
        error={errors.username ? true : false}
        onChange={handleUsernameChange}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        variant='outlined'
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete='phoneNumber'
        pattern="[7-9]{1}[0-9]{9}"
        helperText={errors.phoneNumber}
        error={errors.phoneNumber ? true : false}
        onChange={handlePhoneNumberChange}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        helperText={errors.email}
        error={errors.email ? true : false}
        onChange={handleEmailChange}
       />
      </Grid>

      <Grid item xs={12}>
       <TextField
        variant="outlined"
        required
        fullWidth
        id="country"
        label="Country"
        name="country"
        autoComplete="country"
        helperText={errors.country}
        error={errors.country ? true : false}
        onChange={handleCountryChange}
       />
      </Grid>

      <Grid item xs={12}>
       <TextField
        variant="outlined"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        helperText={errors.password}
        error={errors.password ? true : false}
        onChange={handlePasswordChange}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        variant="outlined"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="current-password"
        onChange={handleConfirmPasswordChange}
       />
      </Grid>
     </Grid>
     <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={handleSubmit}
      disabled={loading ||
       !email ||
       !password ||
       !firstName ||
       !lastName ||
       !country ||
       !username ||
       !phoneNumber}
     >
      Sign Up
      {loading && <CircularProgress size={30} className={classes.progress} />}
     </Button>
     <Grid container justify="flex-end">
      <Grid item>
       <Link href="login" variant="body2">
        Already have an account? Sign in
       </Link>
      </Grid>
     </Grid>
    </form>
   </div>
  </Container>
 )
}

export default Signup