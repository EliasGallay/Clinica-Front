// src/theme/theme.ts
// MUI v7 theme (azules + verdes + blancos) pensado para app clínica.
// Ajustá los hex a tu branding si ya los tenés definidos.

import { createTheme, alpha } from '@mui/material/styles';

export const BRAND = {
  // Azules (confianza / clínica)
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Verdes (salud / confirmación)
  green: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1f2937',
    900: '#0f172a',
  },
};

export const theme = createTheme({
  cssVariables: true, // en MUI v6/v7 ayuda si querés usar CSS vars del theme
  palette: {
    mode: 'light',
    primary: {
      main: BRAND.blue[600],
      light: BRAND.blue[500],
      dark: BRAND.blue[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND.green[600],
      light: BRAND.green[500],
      dark: BRAND.green[700],
      contrastText: '#ffffff',
    },
    success: {
      main: BRAND.green[600],
    },
    info: {
      main: BRAND.blue[600],
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: BRAND.gray[50], // fondo general
      paper: '#ffffff', // cards/modals
    },
    text: {
      primary: BRAND.gray[900],
      secondary: BRAND.gray[600],
      disabled: alpha(BRAND.gray[900], 0.3),
    },
    divider: BRAND.gray[200],
    action: {
      hover: alpha(BRAND.blue[600], 0.06),
      selected: alpha(BRAND.blue[600], 0.1),
      focus: alpha(BRAND.blue[600], 0.12),
      disabled: alpha(BRAND.gray[900], 0.3),
      disabledBackground: alpha(BRAND.gray[900], 0.06),
    },
    grey: BRAND.gray,
  },

  shape: {
    borderRadius: 14, // clínica moderna, suave
  },

  typography: {
    fontFamily: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700, letterSpacing: -0.6 },
    h2: { fontWeight: 700, letterSpacing: -0.4 },
    h3: { fontWeight: 650, letterSpacing: -0.2 },
    h4: { fontWeight: 650 },
    h5: { fontWeight: 650 },
    h6: { fontWeight: 650 },
    button: { textTransform: 'none', fontWeight: 600 },
    // Cuerpo L
    body3: {
      fontSize: '1.13rem',
      lineHeight: '1.75rem',
    },
    // Cuerpo S
    body4: {
      fontSize: '0.88rem',
      lineHeight: '1.25rem',
    },
    // Cuerpo XS
    body5: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          backgroundColor: BRAND.gray[50],
        },
        // Ayuda a que inputs hereden font bien
        'input, button, textarea, select': {
          font: 'inherit',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          fieldset: {
            borderColor: alpha(BRAND.gray[900], 0.18) + ' !important',
          },
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.88) !important',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(BRAND.gray[900], 0.06)}`,
          boxShadow: '0px 8px 24px rgba(15, 23, 42, 0.08)',
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(BRAND.gray[900], 0.06)}`,
          boxShadow: '0px 10px 28px rgba(15, 23, 42, 0.10)',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          minHeight: 44,
          fontWeight: 600,
        },

        containedPrimary: {
          backgroundImage: `linear-gradient(
        180deg,
        ${BRAND.blue[500]},
        ${BRAND.blue[600]}
      )`,
          '&:hover': {
            backgroundImage: `linear-gradient(
          180deg,
          ${BRAND.blue[600]},
          ${BRAND.blue[700]}
        )`,
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(BRAND.blue[600], 0.35),
          },

          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${alpha(BRAND.blue[600], 0.12)}`,
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: BRAND.blue[600],
            borderWidth: 1.5,
          },

          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ef4444',
          },
        },

        notchedOutline: {
          borderColor: alpha(BRAND.gray[900], 0.18),
        },

        input: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: BRAND.gray[500],
          fontWeight: 500,

          '&.Mui-focused': {
            color: BRAND.blue[700],
          },

          '&.Mui-error': {
            color: '#ef4444',
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 10,
          padding: '10px 12px',
          backgroundColor: BRAND.gray[900],
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
  },
});

export default theme;
