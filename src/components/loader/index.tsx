import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Carregando...' }) => {
  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '60px',
      }}
      maxWidth="xl"
    >
      <CircularProgress color="primary" />
      {message}
    </Container>
  );
};
