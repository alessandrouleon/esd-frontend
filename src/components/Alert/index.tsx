import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface AlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: 'error' | 'success';
}

export const Alert = ({ open, onClose, message, type}: AlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
     {message}
      </MuiAlert>
    </Snackbar>
  );
};

