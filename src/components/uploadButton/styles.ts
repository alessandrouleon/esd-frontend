import { Button } from '@mui/material';
import styled from 'styled-components';
import { COLORS } from '../../themes/colors';

export const UploadButtonStyled = styled(Button)`
  && {
    color: red;
    background-color: blue;
    transition: 0.3;

    &:hover {
      background: ${COLORS.NEUTRAL_100} no-repeat padding-box;
    }

    &:disabled {
      background-color: red;
    }

    width: 240px;
    height: 35px;
    font-weight: bold;
  }
`;
