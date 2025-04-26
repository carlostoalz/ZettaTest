import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TimeValue } from '../../../../core/models/TimeValue.model';
import { TokenService } from '../../../../shared/services/token.service';
import { TimeValueService } from '../../services/time-value.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TableModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  @Output() launchFormEvent = new EventEmitter<void>();
  @Output() updateEvent = new EventEmitter<TimeValue>();
  @Output() deleteEvent = new EventEmitter<number>();
  private service = inject(TimeValueService);
  private tokenService = inject(TokenService);
  private fb = inject(FormBuilder);
  timeValues: TimeValue[] = [];
  formArray: FormArray;
  ngOnInit(): void {
    this.service.getTimeValues().subscribe((tvs) => {
      this.timeValues = tvs;
      this.buildForms();
    });
    this.service.getTimeValue().subscribe((timeValue) => {
      if (timeValue) {
        this.timeValues = [...this.timeValues];
        const index = this.timeValues.findIndex((tv) => tv.Id === timeValue.Id);
        index >= 0
          ? (this.timeValues[index] = timeValue)
          : this.timeValues.push(timeValue);
        this.buildForms();
      }
    });
    this.service.getDeletedTimeValue().subscribe((dtv) => {
      if (dtv) {
        this.timeValues = [...this.timeValues];
        const index = this.timeValues.findIndex((tv) => tv.Id === dtv.Id);
        this.timeValues.splice(index, 1);
        this.buildForms();
      }
    });
  }
  buildForms(): void {
    this.formArray = this.fb.array(
      this.timeValues.map((timeValue) =>
        this.fb.group({
          Id: [timeValue.Id, [Validators.required]],
          Date: [new Date(timeValue.Date), [Validators.required]],
          Value: [timeValue.Value, [Validators.required]],
          CreatedBy: [timeValue.CreatedBy, [Validators.required]],
          CreatedAt: [new Date(timeValue.CreatedAt), [Validators.required]],
          UpdatedBy: [this.tokenService.GetId(), [Validators.required]],
          UpdatedAt: [new Date(), [Validators.required]],
        })
      )
    );
  }
  getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }
  launchForm(): void {
    this.launchFormEvent.emit();
  }
  onRowEditSave(index: number): void {
    const formGroup = this.formArray.at(index) as FormGroup;
    this.updateEvent.emit(formGroup.value);
  }
  onDeleteRow(timeValue: TimeValue): void {
    this.deleteEvent.emit(timeValue.Id);
  }
}
