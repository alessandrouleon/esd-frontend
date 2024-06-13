import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogProps,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import * as React from "react";

import {
  ContainerTitle,
  DialogModal,
  ModalDeleteTitle,
  Subtitle,
} from "./styles";
import { COLORS } from "../../themes/colors";

interface DialogContainerProps extends DialogProps {
  open: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: string;
  titleDelete?: string;
}

export default function DialogContainer({
  open,
  handleClose,
  children,
  title,
  subtitle,
  width = "",
  titleDelete,
  ...rest
}: DialogContainerProps) {
  return (
    <DialogModal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...rest}
      valuewidth={width}
    >
      <ContainerTitle>
        <DialogTitle>{title}</DialogTitle>
        {handleClose ? (
          <IconButton onClick={handleClose} size="large">
            <GridCloseIcon
              style={{
                color: `${COLORS.NEUTRAL_700}`,
                fontSize: "large",
              }}
            />
          </IconButton>
        ) : null}
      </ContainerTitle>
      <Subtitle>{subtitle}</Subtitle>
      <ModalDeleteTitle>{titleDelete}</ModalDeleteTitle>
      <DialogContent
        style={{
          padding: "0.625rem",
          margin: "1.3rem",
        }}
      >
        {children}
      </DialogContent>
    </DialogModal>
  );
}
