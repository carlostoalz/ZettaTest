export interface JwtPayload {
  Id: string;
  exp: number;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
}
