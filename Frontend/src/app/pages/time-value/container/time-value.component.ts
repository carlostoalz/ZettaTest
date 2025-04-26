import { DialogModule } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeValue } from '../../../core/models/TimeValue.model';
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
  timeValues: TimeValue[] = [];
  ngOnInit(): void {
    this.service.GetTimeValues();
    this.service.getTimeValues().subscribe((tvs) => (this.timeValues = tvs));
    this.service.getTimeValue().subscribe((timeValue) => {
      if (timeValue) {
        this.timeValues = [...this.timeValues];
        const index = this.timeValues.findIndex((tv) => tv.Id === timeValue.Id);
        index >= 0
          ? (this.timeValues[index] = timeValue)
          : this.timeValues.push(timeValue);
      }
    });
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
