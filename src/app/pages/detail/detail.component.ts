import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  apartmentDetail: List;
  constructor(private apiService: ApiService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    const apartmentId = this.activeRoute.snapshot.params.id;
    this.apiService.getList().subscribe(response => {
      this.apartmentDetail = response.data.find((res => res.id === apartmentId));
      console.log(this.apartmentDetail);
    }, err => {
      console.log(err);
    });
  }

}
