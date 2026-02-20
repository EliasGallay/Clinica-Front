import { CustomModalProps } from '@/types/modal/CustomModalProps';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  children,
  showCancelButton,
  showConfirmButton,
  cancelButtonText,
  confirmButtonText,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <IconButton
            onClick={(e) => onClose!(e, 'backdropClick')}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            {/* Aquí puedes agregar un ícono de cierre o cualquier otro ícono que desees */}
            <CloseOutlinedIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {showCancelButton && (
          <Button onClick={(e) => onClose!(e, 'backdropClick')}>
            <Typography variant="button" color="textSecondary">
              {cancelButtonText || 'Cancelar'}
            </Typography>
          </Button>
        )}
        {showConfirmButton && (
          <Button onClick={onConfirm} variant="contained" color="primary">
            <Typography variant="button">{confirmButtonText || 'Confirmar'}</Typography>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
