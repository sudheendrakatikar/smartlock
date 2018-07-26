import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../Place';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  title = 'Choose a place to stay';
  places: Place[];

  constructor(private router: Router, private placeService: PlaceService) { }  
  
  ngOnInit() {
    this.placeService.getPlaces()
      .subscribe(places => {
        this.places = places;
      });
  }

  gotoPlace(place) {
    this.router.navigate(['pay', place._id]);
  }

  chosenPlace(place) {
    localStorage.setItem('chosenPlace', JSON.stringify(place));
  }

}