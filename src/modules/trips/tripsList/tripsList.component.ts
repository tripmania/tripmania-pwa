import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {getTrips} from '@mocks/trips.mock';

@Component({
  selector: 'trips-list',
  templateUrl: './tripsList.component.html',
  styleUrls: ['./tripsList.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit {
  trips: TripModel[] = getTrips();

  constructor() { }

  ngOnInit() {
  }
}
