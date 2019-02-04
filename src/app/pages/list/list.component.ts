import { Component, OnInit } from '@angular/core';

import { ApiService } from './../../services/api.service';
import { List } from 'src/app/models/list';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  availableApartments: List[];
  filteredApartments: List[];
  totalAvailApart: number;
  cities: string[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Get all the apartments available based on 'availableFromNowOn';
    this.apiService.getList().subscribe(response => {
      this.availableApartments = response.data
                  .filter((res => res.availableFromNowOn === true));
      this.filteredApartments = this.availableApartments;
      this.totalAvailApart = this.availableApartments.length;
      this.getCities();
    }, err => {
      console.log(err);
    });
  }
  // Get all the cities from available apartments and remove duplicates from cities
  getCities() {
    this.cities = this.availableApartments
                  .map(res => res.address.city)
                  .filter((item, pos, self) => self.indexOf(item) === pos);
  }
  // Invoking this function when user change the select box
  searchCities(city) {
    if ( city === 'All') {
      this.filteredApartments = this.availableApartments;
      return;
    }
    this.filteredApartments = this.availableApartments
                  .filter((res) => res.address.city === city);
  }
}
