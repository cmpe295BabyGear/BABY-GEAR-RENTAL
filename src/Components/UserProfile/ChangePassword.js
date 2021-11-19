import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from 'aws-amplify'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom'

const theme = createTheme();

export default function ChangePassword () {
  const [isMatching, setIsMatching] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('')
  const [newPwd, setPwd] = React.useState('')
  const [confirmPwd, setConfirmPwd] = React.useState('')
  const [currentPwd, setCurrentPwd] = React.useState('')
  const [err1, setErr1] = React.useState('')
  const [err2, setErr2] = React.useState('')

  const breadcrumbs = [
    <RouterLink to='/' underline='hover' key='1' color='inherit' >
      Home
    </RouterLink>,
    <RouterLink to='/myProfile' underline='hover' key='2' color='inherit'>
      My Profile
    </RouterLink>,
    <RouterLink to='/changePwd' underline='hover' key='2' color='inherit'>
      Change Password
    </RouterLink>
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPwd === '') {
      setErr1('Please fill in current password !')
    } else if (newPwd === '')
    {
      setErr2('Please fill in New password !')
    } else if (newPwd !== '' && confirmPwd !== '' && newPwd !== confirmPwd) {
      console.log('Password Not matching')
      setErrorMsg('Password Not Matching. Please check again!')
    } else {
      setErrorMsg('')
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(user, currentPwd, confirmPwd);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    // setErrorMsg(msg)
  };

  return (
    <div>
      <Stack spacing={2} marginTop={10}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline /> 
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Change Password
            </Typography>
            <Box component='form' novalidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='currentPassword'
                label='Current Password'
                type='password'
                onChange={(event) => setCurrentPwd(event.target.value)}
                name='currentPassword'
                error={err1 === ''}
                helperText={err1 === '' ? '' : err1}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='newPassword'
                label='Password'
                type='password'
                onChange={(event) => setPwd(event.target.value)}
                name='password'
                error={err2 === ''}
                helperText={err2 === '' ? '' : err1}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                onChange={(event) => setConfirmPwd(event.target.value)}
                error={newPwd !== confirmPwd}
                helperText={newPwd !== confirmPwd ? 'Password Not Matching, please check again !' : ''}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={(event) => handleSubmit(event)}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      </div>
  );
}