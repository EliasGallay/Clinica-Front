import { Typography } from '@mui/material';

export default function TitleCard({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h4">{title}</Typography>
      {description && (
        <Typography variant="body1" className="mt-2">
          {description}
        </Typography>
      )}
    </div>
  );
}
