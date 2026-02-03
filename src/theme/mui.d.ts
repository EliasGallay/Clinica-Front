import type * as React from 'react';
import '@mui/material/styles';
import '@mui/material/Typography';

// 1) Extender el objeto "typography" del theme
declare module '@mui/material/styles' {
  interface TypographyVariants {
    // agregá los variants que quieras
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    body5?: React.CSSProperties;
    label: React.CSSProperties;
    overline2: React.CSSProperties;
  }

  // permite configurarlos dentro de createTheme({ typography: { ... } })
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    body5?: React.CSSProperties;
    label?: React.CSSProperties;
    overline2?: React.CSSProperties;
  }
}

// 2) Permitir que <Typography variant="..."> los use
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
    label: true;
    overline2: true;

    // opcional: si querés deshabilitar alguno existente
    // h6: false;
  }
}

export {};
