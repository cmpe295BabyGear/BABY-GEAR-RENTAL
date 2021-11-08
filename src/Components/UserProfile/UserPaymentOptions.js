import React from 'react'
import { Typography } from '@mui/material'

const UserPaymentOptions = () => {
  return (
    <div>
      <Typography
        component='h4'
        variant='h4'
        align='center'
        style={{ marginTop: 100 }}>
        Currently, You do not have any Payment Options !
      </Typography>
    </div>
  )
}

export default UserPaymentOptions
