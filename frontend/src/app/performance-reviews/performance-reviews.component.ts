import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-performance-reviews',
  templateUrl: './performance-reviews.component.html',
  styleUrls: ['./performance-reviews.component.css']
})
export class PerformanceReviewsComponent implements OnInit {
  performanceReviews$;
  constructor(private router: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit(): void {
   this.performanceReviews$ = this.apiService.get('',`employee/performance/${this.router.snapshot.params.employeeId}`);
  }

}
