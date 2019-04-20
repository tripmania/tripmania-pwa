import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDynamicComponent, IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {filter, map} from 'rxjs/operators';
import {SettingsComponent} from '@modules/settings/settings.component';
import {UserService} from '@shared/services/storeFacadeServices/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, IStaticComponent, IDynamicComponent {
  static ComponentName = 'ProfileComponent';
  userName$ = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user.name)
  );
  userStatus$ = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user.status)
  );
  userPhoto$ = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user.photoUrl)
  );
  userTrips$ = this.tripsService.trips$.pipe(
    map(trips => trips.length)
  );
  tripsContainerHeight$ = this.tripsService.trips$
    .pipe(
      map((trips: any[]) => {
        if (trips.length === 0) {
          return '400px';
        }

        return `${trips.length * 210 + 60}px`;
      })
    );

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(ProfileComponent.ComponentName);
  }

  constructor(private appStateService: AppStateService,
              private tripsService: TripsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.appStateService.setHeaderTransparent();
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
  }

  onPhotoUpload(event) {
    console.log('kek: ', event);
  }
}
