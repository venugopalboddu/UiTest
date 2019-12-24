import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  //Getting data from this Api
  apiUrl = 'https://jsonplaceholder.typicode.com/albums';
  getDetails() {
    return this.http.get(this.apiUrl);
  }
}
