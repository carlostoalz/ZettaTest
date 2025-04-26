import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private service = inject(LoginService);
  private messageService = inject(MessageService);
  private ls = inject(LocalStorageService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  formLogin: FormGroup;
  formRegister: FormGroup;
  ngOnInit(): void {
    this.buildForms();
    this.service.getLoginResult().subscribe((ls) => {
      if (ls) {
        if (!ls.IsCorrect) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: ls.ErrorMessage,
          });
        } else {
          this.ls.SetToken(ls.Token);
          this.router.navigate(['/']);
        }
      }
    });
  }
  buildForms(): void {
    this.formLogin = this.fb.group({
      UserName: [
        null,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
        ],
      ],
      Password: [
        null,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
        ],
      ],
    });
    this.formRegister = this.fb.group({
      UserName: [
        null,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
        ],
      ],
      Password: [
        null,
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(8),
        ],
      ],
      CreatedAt: [new Date()],
      LastLogin: [null],
    });
  }
  onSubmit(event: Event, form: string): void {
    event.preventDefault();
    if (form === 'login') {
      this.service.Login(this.formLogin.value);
    } else {
      this.service.Register(this.formRegister.value);
    }
  }
}
