import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import UserContext from './UserContext'

function Home() {

    const context = useContext(UserContext)

    const {name} = context

    const token = localStorage.getItem('token')

  return (
    <div><Typography variant='h2'>{token ? `Hi ${name}` : "" }</Typography></div>
  )
}

export default Home