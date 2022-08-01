import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import { Avatar, Button, CircularProgress, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
});

const Login = ({ classes = styles }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const userData = {
      email: email,
      password: password
    }
    axios.post('https://us-central1-todos-e176c.cloudfunctions.net/api/login', userData)
      .then(response => {
        localStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
        setLoading(false)
        navigate('/')
      })
      .catch(error => {
        setErrors(error.response.data)
        setLoading(false)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label="Email Address"
            name='emal'
            autoComplete='email'
            autoFocus
            helperText={errors?.email}
            error={errors?.email ? true : false}
            onChange={handleEmailChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            helperText={errors?.password}
            error={errors?.password ? true : false}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant='contained'
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            Sign In
            {loading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="signup" variant='body2'>
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {errors?.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  )
}

export default Login