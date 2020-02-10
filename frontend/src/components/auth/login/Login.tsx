import React, { useState } from 'react'
import {
  Typography,
  Grid,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Link,
} from '@material-ui/core'
import useStyles from './styles'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthType } from 'src/components/auth/auth.types'
import { useAuth } from '../auth.context'
import Router from 'next/router'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    // .email('Invalid email')
    .required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
})

const Login: React.FC = () => {
  const [errorState, setErrorState] = useState<string | null>(null)
  const { login } = useAuth()
  const classes = useStyles({})

  function handleAuthStateChange(state: string) {
    if (state === 'signedIn') {
      /* Do something when the user has signed-in */
    }
  }

  return (
    <div>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }) => {
          const loginResponse = await login({ email, password })

          if (loginResponse === AuthType.LOGIN_SUCCESS) {
            Router.push('/dashboard')
          } else {
            setErrorState(loginResponse)
          }
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={loginSchema}
      >
        {({ errors }) => {
          return (
            <Form translate="no" className={classes.form}>
              <Field
                name="email"
                as={TextField}
                type="input"
                label="Username or email address"
                variant="outlined"
                margin="normal"
                fullWidth
                onFocus={() => {
                  if (errorState === AuthType.NOT_AUTHORIZED) {
                    setErrorState(null)
                  }
                }}
                autoComplete="email"
                autoFocus
                error={errors.email}
                helperText={errors.email}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                onFocus={() => {
                  if (errorState === AuthType.NOT_AUTHORIZED) {
                    setErrorState(null)
                  }
                }}
                fullWidth
                autoComplete="current-password"
                error={errors.password}
                helperText={errors.password}
              />
              {errorState === AuthType.NOT_AUTHORIZED && (
                <Typography color="error">
                  Incorrect username or password.
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login
