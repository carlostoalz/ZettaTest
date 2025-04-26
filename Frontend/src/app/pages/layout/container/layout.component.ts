import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TokenService } from '../../../shared/services/token.service';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavBarComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private tokenService = inject(TokenService);
  private ls = inject(LocalStorageService);
  private router = inject(Router);
  ngOnInit(): void {
    const now = Date.now();
    const timeUntilExpiration = this.tokenService.GetExpiration() - now;
    if (timeUntilExpiration <= 0) {
      this.LogOut();
      return;
    }
    setTimeout(() => {
      this.LogOut();
    }, timeUntilExpiration);
  }

  LogOut(): void {
    this.ls.DeleteToken();
    this.router.navigate(['/login']);
  }
}
