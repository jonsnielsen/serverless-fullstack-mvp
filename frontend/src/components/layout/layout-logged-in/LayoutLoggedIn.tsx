import React from 'react'
import useStyles from './styles'
import HeaderSignedIn from './header-logged-in'

interface ILayoutSignedIn {
  children: any
}

const LayoutSignedIn: React.FC<ILayoutSignedIn> = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <HeaderSignedIn />
      {children}
    </div>
  )
}

export default LayoutSignedIn
