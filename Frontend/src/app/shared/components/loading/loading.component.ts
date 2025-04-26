import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit {
  private service = inject(SharedService);
  loading: boolean = false;
  ngOnInit(): void {
    this.service.getLoading().subscribe((l) => (this.loading = l));
  }
}
