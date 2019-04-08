import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TripEntity} from '@entities/Trip.entity';
import {getTrips} from '@mocks/trips.mock';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {DynamicLoaderService} from '../../dynamic-loader/dynamic-loader.service';
import {TripDetailsComponent} from '../trip-details/trip-details.component';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, AfterViewInit {
  activeState$ = this.storeFacade.activeAppState$;
  container: any;
  trips: TripEntity[] = getTrips();

  constructor(private http: HttpClient,
              private storeFacade: StoreFacadeService,
              private dynamicLoaderService: DynamicLoaderService) { }

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
    this.dynamicLoaderService.addDynamicComponent(
      TripDetailsComponent,
      {
        forTripCreation: false,
        trip
      }
    );
  }
}
