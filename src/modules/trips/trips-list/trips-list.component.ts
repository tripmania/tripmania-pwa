import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/ITrip';
import {getTrips} from '@mocks/trips.mock';
import {HttpClient} from '@angular/common/http';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {Observable} from 'rxjs';
import {AppState} from '@enums/AppState.enum';
import {IHideableComponent} from '@interfaces/IHideableComponent';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, AfterViewInit, IHideableComponent {
  container: any;
  trips: ITrip[] = getTrips();

  constructor(private http: HttpClient,
              private storeFacade: StoreFacadeService) {
  }

  get isComponentHidden(): Observable<boolean> {
    return this.storeFacade.isStaticComponentHidden(AppState.TRIPS);
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

  openTrip(trip: ITrip) {
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
