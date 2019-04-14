import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {getTrips} from '@mocks/trips.mock';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {IStaticComponent} from '@interfaces/IComponent';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';
import {fromEvent, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, pairwise, takeUntil, tap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, OnDestroy, AfterViewInit, IStaticComponent {
  static ComponentName = 'TripsListComponent';

  @Input() hideAddButton = false;

  container: HTMLElement;
  trips: ITrip[] = [];
  private addButton: HTMLButtonElement;
  private destroy$ = new Subject<void>();

  get isComponentHidden$(): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(TripsListComponent.ComponentName);
  }

  constructor(private storeFacade: StoreFacadeService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.container = document.querySelector('cdk-virtual-scroll-viewport');
    this.initAddButtonOnScrollBehavior();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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

  createTrip() {
    this.storeFacade.openDynamicView(
      TripDetailsComponent,
      {
        componentName: TripDetailsComponent.ComponentName,
        inputs: {
          forTripCreation: true
        },
        headerOptions: {
          title: 'Create trip'
        }
      }
    );
  }

  trackByFn(index) {
    return index;
  }

  loadedImage(trip: any) {
    trip.isImageLoaded = true;
  }

  private initAddButtonOnScrollBehavior() {
    this.addButton = document.querySelector('.add-button');

    if (this.addButton) {
      fromEvent(this.container, 'scroll', {passive: true})
        .pipe(
          throttleTime(100),
          takeUntil(this.destroy$),
          map(event => (event.target as any).scrollTop),
          pairwise(),
          map(([first, second]) => second > first),
          distinctUntilChanged(),
          tap(movingDown => {
            if (movingDown) {
              this.addButton.classList.add('add-button-hidden');
            } else {
              this.addButton.classList.remove('add-button-hidden');
            }
          })
        )
        .subscribe();
    }
  }
}
