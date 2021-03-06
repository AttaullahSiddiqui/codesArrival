import { Injectable } from '@angular/core';
import { finalize } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient, private storage: AngularFireStorage) { }
  fetchAPI(url) {
    return this._http.get(url)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  postAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  putAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  deleteAPI(url, reqData) {
    return this._http.delete(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIWithLimit(url, skip, limit, id?) {
    const params = {
      skipNo: skip,
      limitNo: limit,
      _id: id
    }
    return this._http.get(url, { params: params })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIUsingId(url, id) {
    return this._http.get(url, { params: { _id: id } })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  sortAPI(url, updatedArray) {
    return this._http.post(url, updatedArray)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  storeImage(filePath, selectedImage, cb) {
    const fileRef = this.storage.ref(filePath);
    return this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          cb(undefined, url);
        }, (err) => { cb(err); })
      })
    );
  }
  // addUser() {
  //   var userData = {
  //     userName: "danish",
  //     userPass: "jackking9",
  //     admin: true
  //   }
  //   return this._http.post("/api/register", userData)
  //     .pipe(map(res => console.log(res)));
  // }
}
