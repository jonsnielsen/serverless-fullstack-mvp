import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'src/config/theme'
import { AuthProvider } from 'src/components/auth/auth.context'
import Auth from '@aws-amplify/auth'
import amplifyConfig from 'src/config/amplifyConfig'

Auth.configure(amplifyConfig)

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    // @ts-ignore
    const { Component, pageProps, user } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default MyApp
