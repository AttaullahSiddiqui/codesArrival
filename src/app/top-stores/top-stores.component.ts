import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-top-stores',
  templateUrl: './top-stores.component.html',
  styleUrls: ['./top-stores.component.scss']
})
export class TopStoresComponent implements OnInit {
  storeArr = [];
  skipNo = 0;
  responseError = "";
  responseSuccess = "";

  constructor(private _dataService: DataService) {
    this.getCategoriesFunc()
  }

  ngOnInit() {

  }
  getCategoriesFunc() {
    this._dataService.fetchAPIWithLimit("/api/fetchStoresWithLimit", this.skipNo, 10).subscribe(res => {
      if (res.data) {
        this.storeArr = res.data;
        this.responseError = "";
      } else {
        window.scrollTo(0, 0)
        if (this.skipNo) this.skipNo -= 5;
        this.responseError = res.message
      }
    })
  }
  nextFunc() {
    if (!this.skipNo) {
      this.skipNo += 5;
    }
    this.getCategoriesFunc()
  }
  // options: SortablejsOptions = {
  //   onUpdate: (event: any) => {
  //     console.log(event);
  //   }
  // };
  closeSuccess() {
    this.responseSuccess = ""
  }
  closeError() {
    this.responseError = ""
  }
}
