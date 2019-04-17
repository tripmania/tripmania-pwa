import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {IStaticComponent} from '@interfaces/IComponent';
import {combineLatest, fromEvent, interval, Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, switchMap, takeUntil, tap, throttleTime} from 'rxjs/operators';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {FilesService} from '@shared/services/files.service';
import {SettingsComponent} from '@modules/settings/settings.component';

@Component({
  selector: 'trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsListComponent implements OnInit, OnDestroy, AfterViewInit, IStaticComponent {
  static ComponentName = 'TripsListComponent';

  @ViewChild('containerRef', {read: ElementRef}) containerRef: ElementRef;
  @ViewChild('addButtonRef', {read: ElementRef}) addButtonRef: ElementRef;
  @Input() hideAddButton = false;
  @Input() userId: number;
  @Input() mustBeVisible: boolean;
  @Input() containerHeight = '100%';

  container: HTMLElement;
  trips$: Observable<ITrip[]> = null;
  tripsLoaded$ = this.tripsService.tripsLoaded$;
  private addButton: HTMLButtonElement;
  private destroy$ = new Subject<void>();

  get isComponentHidden$(): Observable<boolean> {
    if (this.mustBeVisible) {
      return of(false);
    }

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
    this.container = this.containerRef.nativeElement;
    if (this.mustBeVisible) {
      combineLatest(
        interval(300),
        this.appStateService.isDynamicComponentLoaded$
      )
        .pipe(
          filter(([i, loaded]) => !loaded),
          takeUntil(this.destroy$),
          map(() => {
            const containerRect = this.container.getBoundingClientRect();

            return containerRect.top === 50;
          }),
          distinctUntilChanged()
        )
        .subscribe(onTop => {
          if (onTop) {
            this.appStateService.setHeaderTitle('Trips');
            this.appStateService.setHeaderAction('add', () => this.createTrip, true);
            this.container.classList.remove('overflow-hidden');
          } else {
            this.appStateService.setHeaderTitle('Profile');
            this.appStateService.setHeaderAction(
              'settings',
              () => {
                this.appStateService.openDynamicView(
                  SettingsComponent,
                  {
                    componentName: 'SettingsComponent',
                    inputs: null,
                    headerOptions: {
                      title: 'Settings'
                    }
                  }
                );
              },
              true
            );
            this.container.classList.add('overflow-hidden');
          }
        });
    }
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
    if (this.addButtonRef) {
      this.addButton = this.addButtonRef.nativeElement;

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
