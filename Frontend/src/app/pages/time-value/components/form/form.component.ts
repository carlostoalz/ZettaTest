import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TimeValue } from '../../../../core/models/TimeValue.model';
import { TokenService } from '../../../../shared/services/token.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, CalendarModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  @Output() createTimeValue = new EventEmitter<TimeValue>();
  private fb = inject(FormBuilder);
  private tokenService = inject(TokenService);
  form: FormGroup;
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      Id: [0, [Validators.required]],
      Date: [null, [Validators.required]],
      Value: [null, [Validators.required]],
      CreatedBy: [this.tokenService.GetId(), [Validators.required]],
      CreatedAt: [new Date(), [Validators.required]],
      UpdatedBy: [null],
      UpdatedAt: [null],
    });
  }
  onSubmitForm(event: Event): void {
    event.preventDefault();
    this.createTimeValue.emit(this.form.value);
  }
}
