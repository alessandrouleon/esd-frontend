import React from 'react';
import { Avatar as MuiAvatar, Box } from '@mui/material';
import { COLORS } from '../../themes/colors';

interface AvatarComponentProps {
  src: string;
  alt?: string;
  size?: number;
  isOnline?: boolean;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  src,
  alt = '',
  size = 40,
  isOnline = false,
}) => (
  <Box sx={{ position: 'relative', display: 'inline-block' }}>
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
      }}
    />
    {isOnline && (
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size * 0.3,
          height: size * 0.3,
          backgroundColor: COLORS.SUCCESS_A400,
          borderRadius: '50%',
          border: '2px solid white',
        }}
      />
    )}
  </Box>
);

export default AvatarComponent;
