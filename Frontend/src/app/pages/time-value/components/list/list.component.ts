import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { TimeValue } from '../../../../core/models/TimeValue.model';
import { TimeValueService } from '../../services/time-value.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, MatDialogModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  @Output() launchFormEvent = new EventEmitter<void>();
  private service = inject(TimeValueService);
  timeValues: TimeValue[] = [];
  ngOnInit(): void {
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
    this.launchFormEvent.emit();
  }
}
