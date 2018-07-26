import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  places: any;
  constructor(private http: Http) { }

  getPlaces() {
    return this.http.get('http://localhost:3000/places/').pipe(
      map(res => res.json())
    );
  }

  getPlace(id) {
    return this.http.get('http://localhost:3000/place/'+id).pipe(
      map(res => res.json())
    );
  }

  blockPlace(id) {
    return this.http.get('http://localhost:3000/block/'+id).pipe(
      map(res => res.json())
    );
  }

  freePlace(id) {
    return this.http.get('http://localhost:3000/free/'+id).pipe(
      map(res => res.json())
    );
  }
}
