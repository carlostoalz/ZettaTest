import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input({ required: true }) timeValues: TimeValue[];
  @Output() launchFormEvent = new EventEmitter<void>();
  private service = inject(TimeValueService);
  ngOnInit(): void {}
  launchForm(): void {
    this.launchFormEvent.emit();
  }
}
