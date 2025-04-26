import { inject, Injectable } from '@angular/core';
import { JwtPayload } from '../../core/models/JwtPayload.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private ls = inject(LocalStorageService);
  GetId(): number {
    const claims = this.GetTokenClaims();
    return claims ? Number.parseInt(claims.Id) : null;
  }
  GetEmail(): string {
    const claims = this.GetTokenClaims();
    return claims
      ? claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      : null;
  }
  GetExpiration(): number {
    const claims = this.GetTokenClaims();
    return claims ? claims.exp * 1000 : null;
  }
  private GetTokenClaims(): JwtPayload {
    const token = this.ls.GetToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }
}
