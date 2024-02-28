"use client";
import { useState } from "react";
import DashLayout from '../../ui/layouts/DashLayout/page'
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { AccountProfile } from '../../ui/sections/account/account-profile';
import { AccountProfileDetails } from '../../ui/sections/account/account-profile-details';
import 'simplebar-react/dist/simplebar.min.css';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '../../ui/theme/cooming';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Categories() {
  const theme = createTheme();
  return (
    <DashLayout>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">
                  Account
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    <AccountProfile />
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                    lg={8}
                  >
                    <AccountProfileDetails />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>

    </DashLayout>
  );
}

export default Categories;
