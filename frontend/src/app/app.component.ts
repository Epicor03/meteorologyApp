import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  subs = new Subscription;
  $cities: BehaviorSubject<Object> = new BehaviorSubject<Array<Object>>([]);
  canvasUrl: SafeResourceUrl = '';

  filterArray: string[] = [];
  
  constructor(private http: HttpClient,private sanitizer: DomSanitizer){}

  ngOnInit() {
    this.fillCitiesByGetRequest();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }


  fillCitiesByGetRequest(){
    this.http.get('http://localhost:3000/cities').subscribe((data) => {
      this.$cities.next(data);
    
    });
  }

  onChangeOption(option:string){

    this.canvasUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/city/temperatures?city=' + option.replace(/\s/g, ""));

  }

  setOrder(filterBy:string){

    this.subs.add(this.$cities.subscribe((cities:any) =>{
      switch(filterBy) { 
        case 'name': {    

          return cities.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        }
        case 'temperature': { 

          return cities.sort((n1,n2) => Number(n1.temperature) - Number(n2.temperature));
          
        }
        case 'startDay': {
        
          return cities.sort((n1,n2) => Number(n1.startDay.hour) - Number(n2.startDay.hour));
        }
        case 'endDay': { 
        
          return cities.sort((n1,n2) => Number(n1.endDay.hour) - Number(n2.endDay.hour));
        }
        default: { 
        //statements; 
          break; 
      } 
    } 
    }));
  }
}


