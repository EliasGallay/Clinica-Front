import { BRAND } from '@/theme/theme';
import {
  FormControlLabel,
  FormGroup,
  styled,
  Switch,
  SwitchProps,
  Typography,
} from '@mui/material';

const CustomSwitch = styled((props: SwitchProps) => <Switch disableRipple {...props} />)(() => ({
  // tus variables CSS
  '--button-width': '2em',
  '--button-height': '1.1em',
  '--toggle-diameter': '0.9em',
  '--button-toggle-offset': 'calc((var(--button-height) - var(--toggle-diameter)) / 2)',
  '--toggle-shadow-offset': '10px',
  '--toggle-wider': '1.5em',
  '--color-grey': '#cccccc',
  '--color-green': BRAND.green[500],

  width: 'var(--button-width)',
  height: 'var(--button-height)',
  padding: 0,
  overflow: 'visible',

  // el "base" que mueve el thumb
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 'var(--button-toggle-offset)',
    transition: '0.3s all ease-in-out',

    '&.Mui-checked': {
      transform:
        'translateX(calc(var(--button-width) - var(--toggle-diameter) - (var(--button-toggle-offset) * 2)))',

      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--color-green)',
        opacity: 1,
      },
    },

    // efecto "active" (como tu :active ensanchando el toggle)
    '&:active .MuiSwitch-thumb': {
      width: 'var(--toggle-wider)',
    },

    '&.Mui-checked:active .MuiSwitch-thumb': {
      // al ensanchar, el centro cambia; ajustamos para que “toque” el borde derecho
      transform:
        'translateX(calc(var(--button-width) - var(--toggle-wider) - var(--toggle-diameter)))',
    },
  },

  // el thumb es tu ::after
  '& .MuiSwitch-thumb': {
    width: 'var(--toggle-diameter)',
    height: 'var(--toggle-diameter)',
    backgroundColor: '#fff',
    borderRadius: 'calc(var(--toggle-diameter) / 2)',
    boxShadow:
      'var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0,0,0,0.1)',
    transition: '0.3s all ease-in-out',
  },

  // el track es tu .slider
  '& .MuiSwitch-track': {
    borderRadius: 'calc(var(--button-height) / 2)',
    backgroundColor: 'var(--color-grey)',
    opacity: 1,
    transition: '0.3s all ease-in-out',
  },

  // sombra invertida cuando está checked (como tu box-shadow negativo)
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
    boxShadow:
      'calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0,0,0,0.1)',
  },
}));

interface CustomFormGroupSwitchProps extends SwitchProps {
  state: {
    read: boolean;
    write: boolean;
  };
}

export const CustomFormGroupSwitch: React.FC<CustomFormGroupSwitchProps> = ({
  onChange,
  state,
}) => {
  return (
    <FormGroup sx={{ gap: 1 }}>
      <FormControlLabel
        control={<CustomSwitch checked={state.read} onChange={onChange} name="read" />}
        label={
          <Typography variant="body5" fontStyle={'italic'} fontWeight={500}>
            Read
          </Typography>
        }
        labelPlacement="start"
        sx={{ gap: 1 }}
      />
      <FormControlLabel
        control={<CustomSwitch checked={state.write} onChange={onChange} name="write" />}
        label={
          <Typography variant="body5" fontStyle={'italic'} fontWeight={500}>
            Write
          </Typography>
        }
        labelPlacement="start"
        sx={{ gap: 1 }}
      />
    </FormGroup>
  );
};
