export type LoginResponse = {
  token: string;
  refreshToken: string;
  expiresIn?: number; // segundos
  rtk_dat_expires_at?: number; // segundos
};
