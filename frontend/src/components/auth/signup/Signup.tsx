import React, { useState } from 'react'
import useStyles from './styles'
import { Typography, TextField, Button } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../auth.context'
import { AuthType } from 'src/components/auth/auth.types'
import Router from 'next/router'

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required(),
})

interface ISignup {}

const Signup: React.FC<ISignup> = ({}) => {
  const [errorState, setErrorState] = useState<string | null>(null)
  const classes = useStyles()
  const { signup } = useAuth()
  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Formik
        initialValues={{ name: '', email: '', password: '', username: '' }}
        onSubmit={async ({ email, password, name, username }) => {
          const signupResponse = await signup({
            email,
            password,
            name,
            username,
          })
          if (signupResponse === AuthType.SIGNUP_SUCCESS) {
            // redirect
            Router.push('/home')
          } else {
            console.error(signupResponse)
            setErrorState(signupResponse)
          }
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={signupSchema}
      >
        {({ errors }) => {
          return (
            <Form translate="no" className={classes.form}>
              <Field
                error={!!errors.name}
                helperText={errors.name}
                name="name"
                type="input"
                as={TextField}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoComplete="name"
                autoFocus
              />

              <Field
                error={!!errors.username}
                helperText={errors.username}
                name="username"
                type="input"
                as={TextField}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                label="Username"
              />
              <Field
                name="email"
                type="input"
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                error={
                  !!errors.email || errorState === AuthType.USERNAME_EXISTS
                }
                helperText={
                  errors.email ||
                  (errorState === AuthType.USERNAME_EXISTS &&
                    'This email is already in use')
                }
                onFocus={() => {
                  if (errorState === AuthType.USERNAME_EXISTS) {
                    setErrorState(null)
                  }
                }}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={
                  !!errors.password || errorState === AuthType.INVALID_PASSWORD
                }
                helperText={
                  errors.password ||
                  (errorState === AuthType.INVALID_PASSWORD &&
                    'Password must contain uppercase letters, lowercase letters and numbers')
                }
                label="Password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign up
              </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Signup
