export interface AlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: 'error' | 'success';
}

export const InitialAlertProps = {
    open: false,
    message: "",
    type: "error" as "error" | "success",
  };

