import { Grid } from '@mui/material'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import loginImage from '~/assets/login.jpg'
import LoginForm from './components/LoginForm'
import { Heading, StyledBox, StyledContainer, StyledPaper, SubHeading } from './Login.styled'

export default function Login() {
  const { accessToken } = useAuth()

  if (accessToken) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Grid container height='100%'>
          <Grid item xs={12} lg={6} height='100%'>
            <img src={loginImage} alt='Orchidify login image' width='100%' />
          </Grid>
          <Grid item xs={12} lg={6} height='100%'>
            <StyledBox>
              <Heading>Đăng nhập</Heading>
              <SubHeading>Hãy nhập thông tin tài khoản để truy cập vào hệ thống.</SubHeading>
              <LoginForm />
            </StyledBox>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  )
}
