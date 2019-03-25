import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {getTrips} from '@mocks/trips.mock';

@Component({
  selector: 'travels',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsComponent implements OnInit {
  trips: TripModel[] = getTrips();

  constructor() { }

  ngOnInit() {
  }
}
