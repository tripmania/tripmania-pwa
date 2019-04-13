import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {getTrips} from '@mocks/trips.mock';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {IStaticComponent} from '@interfaces/IComponent';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, AfterViewInit, IStaticComponent {
  static ComponentName = 'TripsListComponent';

  container: any;
  trips: ITrip[] = getTrips();

  get isComponentHidden$(): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(TripsListComponent.ComponentName);
  }

  constructor(private storeFacade: StoreFacadeService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.container = document.querySelector('cdk-virtual-scroll-viewport');
  }

  openTrip(trip: ITrip) {
    this.storeFacade.openDynamicView(
      TripDetailsComponent,
      {
          componentName: TripDetailsComponent.ComponentName,
          inputs: {
            forTripCreation: false,
            trip
          },
          headerOptions: {
            title: trip.title
        }
      });
  }

  trackByFn(index) {
    return index;
  }
}
