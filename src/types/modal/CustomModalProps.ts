import { ModalProps } from "@mui/material";

export interface CustomModalProps extends ModalProps {
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}