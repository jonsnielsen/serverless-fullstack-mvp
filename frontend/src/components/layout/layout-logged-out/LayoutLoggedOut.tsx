import React from 'react'
import useStyles from './styles'
import HeaderSignedOut from './header-logged-out'

interface ILayoutSignedOut {
  children: any
}

const LayoutSignedOut: React.FC<ILayoutSignedOut> = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <HeaderSignedOut />
      {children}
    </div>
  )
}

export default LayoutSignedOut
