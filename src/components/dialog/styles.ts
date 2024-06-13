import { Dialog } from '@mui/material';
import { styled as styledMaterial } from '@mui/material/styles';
import styled from 'styled-components';
import { COLORS } from '../../themes/colors';

interface IRequestProps {
  valuewidth: string;
}

export const DialogModal = styledMaterial(Dialog)(
  ({ valuewidth }: IRequestProps) => ({
    '& .MuiDialogTitle-root': {
      padding: '0',
      marginTop: '1rem',
    },
    '& .MuiTypography-h5': {
      fontSize: '18px',
    },
    '& .MuiTypography-h6': {
      color: 'var(--neutral-800)',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    '& .MuiDialogContent-root': {
      padding: '0 30px 0 30px',
      marginBottom: '38px',
    },
    '& .MuiDialogActions-root': {
      padding: '0 30px 30px 30px',
    },
    '& .MuiDialog-paperWidthSm': {
      minWidth: valuewidth,
    },
  })
);
export const ContainerTitle = styled.div`
  padding: 1.875rem 1rem 0rem 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
`;
export const Subtitle = styled.span`
  padding: 1rem 1.875rem 0rem 1.875rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${COLORS.NEUTRAL_700}
`;

export const ModalDeleteTitle = styled.span`
  display: flex;
  margin-left: 1.8rem;
  position: absolute;
  margin-top: 2.8rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${COLORS.PRIMARY_500}
`;
