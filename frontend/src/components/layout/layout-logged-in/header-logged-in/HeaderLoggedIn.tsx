import React from 'react'
import { AppBar, Button } from '@material-ui/core/'
import EarthIcon from 'src/assets/img/EarthIcon'
import { useAuth } from 'src/components/auth/auth.context'
import useStyles from './styles'
import { AuthType } from 'src/components/auth/auth.types'
import Router from 'next/router'

const Header: React.FC = () => {
  const classes = useStyles()
  const { logout } = useAuth()

  const handleLogout = async () => {
    const logoutResponse = await logout()
    if (logoutResponse === AuthType.LOGOUT_SUCCESS) {
      Router.push('/')
    }
  }
  return (
    <AppBar className={classes.root}>
      <EarthIcon color="secondary" style={{ fontSize: 40 }}></EarthIcon>
      <Button
        color="secondary"
        onClick={handleLogout}
        className={classes.loginButton}
      >
        Log out
      </Button>
    </AppBar>
  )
}

export default Header
