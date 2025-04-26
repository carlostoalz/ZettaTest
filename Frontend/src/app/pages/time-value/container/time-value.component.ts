import { Component, inject, OnInit } from '@angular/core';
import { TimeValueService } from '../services/time-value.service';

@Component({
  selector: 'app-time-value',
  standalone: true,
  imports: [],
  templateUrl: './time-value.component.html',
  styleUrl: './time-value.component.css',
})
export class TimeValueComponent implements OnInit {
  private service = inject(TimeValueService);
  ngOnInit(): void {
    this.service.GetTimeValues();
  }
}
