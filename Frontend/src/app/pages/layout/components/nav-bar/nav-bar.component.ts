import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TokenService } from '../../../../shared/services/token.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Output() LogOutEvent = new EventEmitter<void>();
  tokenService = inject(TokenService);

  LogOut(): void {
    this.LogOutEvent.emit();
  }
}
