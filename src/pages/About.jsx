import React from 'react';
import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';

const AboutContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: white;
`;

function About() {
  return (
    <AboutContainer maxWidth={false}>
      <Typography variant="h2" component="h1" gutterBottom>
        About RIO Gaming
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Your ultimate gaming destination
      </Typography>
    </AboutContainer>
  );
}

export default About;