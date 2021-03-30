import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CitiesService {
  cities:any = []; 

  constructor(private http: HttpClient) { }


  fillCities(){
  this.http.get('cities').subscribe((data) => {
    debugger;
    this.cities= data;
  });
}



}
