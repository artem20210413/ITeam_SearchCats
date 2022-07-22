import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { listBreeds, listImages } from 'src/Module/Module';

const URL = 'https://api.thecatapi.com/v1/';
const xApiKkey = '6ef95fac-6a7e-45fb-8a10-7f78d2762745';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'SearchCats';

  @Input() listimages: listImages[] | undefined;
  @Input() listimagesany: any;
  @Input() listbreeds: listBreeds[] | undefined;

  constructor(private http: HttpClient) { }
  numberImages: any | undefined;
  selectedBreed = null;
  selectedLimit = 12;

  //search by filter
  search() {
    let httpHeader = new HttpHeaders({
      'x-api-key': xApiKkey
    })
    if (this.selectedBreed == null || this.selectedBreed == 'all') {
      try {
        this.http.get((URL + 'images/search' + '?' + 'limit' + '=' + this.selectedLimit), { headers: httpHeader })
        .subscribe((data) => {
          this.listimagesany = data;
          this.listimages = this.listimagesany;
        });
      } catch { alert("Unknown error") }
    }
    else try {
      this.http.get((URL + 'images/search' + '?' + 'breed_id' + '=' + this.selectedBreed + '&' + 'limit' + '=' + this.selectedLimit), { headers: httpHeader })
      .subscribe((data) => {
        this.listimagesany = data;
        this.listimages = this.listimagesany
        console.log(this.selectedBreed)
      });
    } catch { alert("Unknown error") }
  }

  //breed search
  searchBreeds() {
    let httpHeader = new HttpHeaders({
      'x-api-key': xApiKkey
    })
    try {
      this.http.get((URL + 'breeds'), { headers: httpHeader })
        .subscribe((data) => {
          this.listimagesany = data;
          this.listbreeds = this.listimagesany
        });
    } catch { alert("Unknown error") }
  }

  ngOnInit() {
    this.search()
    this.searchBreeds()
  }
}
