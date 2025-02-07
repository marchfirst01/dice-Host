export interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    name: string;
    userRole: string | null;
  };
}
