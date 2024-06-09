import {createTheme} from '@mui/material';
import { COLORS } from './colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY_500,
      contrastText: COLORS.BACKGROUND_BASE,
    },
    secondary: {
      main: COLORS.NEUTRAL_500,
      contrastText: COLORS.BACKGROUND_BASE,
    },
    background: {
      default: COLORS.BACKGROUND_DARK,
      paper: COLORS.BACKGROUND_BASE,
    },
  },
});