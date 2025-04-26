import { DialogModule } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../components/form/form.component';
import { ListComponent } from '../components/list/list.component';
import { TimeValueService } from '../services/time-value.service';

@Component({
  selector: 'app-time-value',
  standalone: true,
  imports: [ListComponent, DialogModule],
  templateUrl: './time-value.component.html',
  styleUrl: './time-value.component.css',
})
export class TimeValueComponent implements OnInit {
  private service = inject(TimeValueService);
  private dialog = inject(MatDialog);
  ngOnInit(): void {
    this.service.GetTimeValues();
  }
  launchForm(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '50%',
      disableClose: true,
    });
    dialogRef.componentInstance.createTimeValue.subscribe((timeValue) => {
      if (timeValue) this.service.CreateTimeValue(timeValue);
    });
  }
}
