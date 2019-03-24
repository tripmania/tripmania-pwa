import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {getTrips} from '@mocks/trips.mock';
import {transformImageToContainer} from '@shared/helpers/image.helper';

@Component({
  selector: 'travels',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit, AfterViewInit {
  trips: TripModel[] = getTrips();
  imageLoads: boolean[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.imageLoads = transformImageToContainer('.trip-card', '.trip-card__img');
  }
}
