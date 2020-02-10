import React, { useState } from 'react'
import {
  AppBar,
  Button,
  Drawer,
  Box,
  IconButton,
  Link,
} from '@material-ui/core'
import EarthIcon from 'src/assets/img/EarthIcon'
import useStyles from './styles'
import { DrawerStates } from './types'
import Login from 'src/components/auth/login'
import Signup from 'src/components/auth/signup'
import { CloseRounded as CloseIcon } from '@material-ui/icons'
import { ButtonProps } from '@material-ui/core/Button'

interface IButtonProps {
  color?: string
}

const Header: React.FC = () => {
  const [drawerState, setDrawerState] = useState<DrawerStates>(
    DrawerStates.CLOSED
  )
  const classes = useStyles()

  const LoginButton = (overrides: ButtonProps) => (
    <Button
      color="secondary"
      className={classes.loginButton}
      onClick={() => setDrawerState(DrawerStates.LOGIN)}
      {...overrides}
    >
      Log in
    </Button>
  )

  const SignupButton = (overrides: any) => (
    <Button
      color="secondary"
      className={classes.loginButton}
      onClick={() => setDrawerState(DrawerStates.SIGNUP)}
      {...overrides}
    >
      Sign up
    </Button>
  )

  return (
    <>
      <AppBar className={classes.root}>
        <EarthIcon color="secondary" style={{ fontSize: 40 }}></EarthIcon>
        <div>
          <LoginButton />
          <SignupButton />
        </div>
      </AppBar>
      <Drawer
        hideBackdrop={true}
        open={drawerState !== DrawerStates.CLOSED}
        onClose={() => setDrawerState(DrawerStates.CLOSED)}
        anchor="right"
      >
        <Box className={classes.loginoutWrapper}>
          <Box className={classes.drawerHeader}>
            <IconButton
              color="primary"
              onClick={() => setDrawerState(DrawerStates.CLOSED)}
            >
              <CloseIcon color="primary" />
            </IconButton>
            {drawerState === DrawerStates.LOGIN ? (
              <SignupButton color="primary" />
            ) : (
              <LoginButton color="primary" />
            )}
          </Box>
          <Box className={classes.formWrapper}>
            {drawerState === DrawerStates.LOGIN ? <Login /> : <Signup />}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
