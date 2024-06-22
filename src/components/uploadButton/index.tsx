import React from 'react';
import { CircularProgress } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { UploadButtonStyled } from './styles';

interface UploadButtonProps extends ButtonProps {
  handleSave: () => void;
  loading: boolean;
  label?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ handleSave, loading, label, ...rest }) => {
  return (
    <UploadButtonStyled onClick={handleSave} disabled={loading} {...rest}>
      {loading ? (
        <CircularProgress style={{ color: 'var(--primary-500)' }} size={20} />
      ) : (
        label || 'Upload'
      )}
    </UploadButtonStyled>
  );
};

export default UploadButton;
