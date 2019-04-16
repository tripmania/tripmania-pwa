import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {IStaticComponent} from '@interfaces/IComponent';
import {fromEvent, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, pairwise, takeUntil, tap, throttleTime} from 'rxjs/operators';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {FilesService} from '@shared/services/files.service';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, OnDestroy, AfterViewInit, IStaticComponent {
  static ComponentName = 'TripsListComponent';

  @Input() hideAddButton = false;
  @Input() userId: number;

  container: HTMLElement;
  trips$: Observable<ITrip[]> = null;
  tripsLoaded$ = this.tripsService.tripsLoaded$;
  private addButton: HTMLButtonElement;
  private destroy$ = new Subject<void>();

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(TripsListComponent.ComponentName);
  }

  constructor(private appStateService: AppStateService,
              private tripsService: TripsService,
              private filesService: FilesService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.trips$ = this.tripsService.getTripsByUserId(this.userId);
  }

  ngAfterViewInit() {
    this.container = document.querySelector('cdk-virtual-scroll-viewport');
    this.initAddButtonOnScrollBehavior();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openTrip(trip: ITrip) {
    this.appStateService.openDynamicView(
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
    this.appStateService.openDynamicView(
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

  loadImage(trip: ITrip) {
    this.filesService.loadFileToUrl(trip.photoUrl)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(url => {
        this.changeDetector.markForCheck();
        (trip as any).isImageShown = true;
        trip.localPhotoUrl = url;
      });
  }

  loadedImage(trip: any) {
    trip.isImageLoaded = true;
  }

  private initAddButtonOnScrollBehavior() {
    this.addButton = document.querySelector('.add-button');

    if (this.addButton) {
      fromEvent(this.container, 'scroll', {passive: true})
        .pipe(
          throttleTime(50),
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
