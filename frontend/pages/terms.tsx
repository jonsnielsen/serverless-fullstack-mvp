import React from 'react'
import { NextPage } from 'next'
import { Typography, Box } from '@material-ui/core'

const Terms: NextPage = props => {
  return (
    <Box>
      <Typography component="h2">My App's Terms of Service</Typography>
      <Typography component="p">Lorem ipsum</Typography>
    </Box>
  )
}

export default Terms
