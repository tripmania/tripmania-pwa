import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TripEntity} from '@entities/Trip.entity';
import {getTrips} from '@mocks/trips.mock';
import {HttpClient} from '@angular/common/http';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {Observable} from 'rxjs';
import {AppState} from '@enums/AppState.enum';
import {HideableComponent} from '@entities/HideableComponent.entity';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, AfterViewInit, HideableComponent {
  container: any;
  trips: TripEntity[] = getTrips();

  constructor(private http: HttpClient,
              private storeFacade: StoreFacadeService) {
  }

  get isComponentHidden(): Observable<boolean> {
    return this.storeFacade.isMainComponentHidden(AppState.TRIPS);
  }

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

  openTrip(trip: TripEntity) {
    this.storeFacade.openComponent(
      TripDetailsComponent,
      {
        forTripCreation: false,
        trip
      },
      trip.title
    );
  }
}
