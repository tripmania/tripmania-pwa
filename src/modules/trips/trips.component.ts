import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {getTrips} from '@mocks/trips.mock';

@Component({
  selector: 'travels',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit, AfterViewInit, AfterContentInit {
  trips: TripModel[] = getTrips();
  imageLoads = new Array<boolean>(this.trips.length);
  private images: HTMLImageElement[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.images = [].slice.call(document.querySelectorAll('.trip-card__img'));

    for (let i = 0; i < this.images.length; i++) {
      this.images[i].onload = () => setTimeout(() => this.imageLoads[i] = true, 500);
    }
  }
}
