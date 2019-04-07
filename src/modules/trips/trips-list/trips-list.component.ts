import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {getTrips} from '@mocks/trips.mock';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, AfterViewInit {
  container: any;
  trips: TripModel[] = getTrips();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get(apiUrls.TRIPS_URL)
    //   .subscribe(
    //     res => console.log('res: ', res),
    //     error => console.log('error: ', error)
    //   );
  }

  ngAfterViewInit() {
    this.container = document.querySelector('cdk-virtual-scroll-viewport');
  }
}
