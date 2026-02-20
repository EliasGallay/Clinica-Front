import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

interface ActionsButtonsProps {
  confirmButtonLabel: string;
  cancelButtonLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  router?: ReturnType<typeof useRouter>;
  isSubmitting?: boolean;
}

export const ActionsButtons = ({
  confirmButtonLabel,
  cancelButtonLabel,
  type = 'button',
  router,
  isSubmitting = false,
}: ActionsButtonsProps) => {
  return (
    <div className="flex gap-4 justify-end p-6 border-t border-gray-100 bg-gray-100">
      {cancelButtonLabel && (
        <Button variant="text" sx={{ color: grey[900] }} onClick={() => router?.back()}>
          {cancelButtonLabel}
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        type={type}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {confirmButtonLabel}
      </Button>
    </div>
  );
};
