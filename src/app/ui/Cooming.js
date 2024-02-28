'use client'
import NextLink from 'next/link';
//import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme/cooming';
// import batman from '../../public/next.svg'

const Page = () => { 
    const theme = createTheme();
    return (
  <ThemeProvider theme={theme}>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src="https://cdn-3.expansion.mx/dims4/default/04be78e/2147483647/strip/true/crop/1254x836+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F0b%2F4a%2F16fb7cf8426b8757feb3dae30298%2F190521-robot-trabajo-is.jpg"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 600
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            We are working to get <box style= {{ color: 'blue'}}>Farmax</box> ready in a short time ...
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            Go ahead... log in!!!
          </Typography>
          <Button
            component={NextLink}
            href="/login"
            
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to Login
          </Button>
        </Box>
      </Container>
    </Box>
    </ThemeProvider >
)};

export default Page;
