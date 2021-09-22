import { Typography } from '@mui/material'
import React from 'react'

const UserAddresses = () => {
  return (
    <div>
      <Typography
        component='h4'
        variant='h4'
        align='center'
        style={{ marginTop: 100 }}>
          Currently, You do not have any addresses !
      </Typography>
    </div>
  )
}

export default UserAddresses
