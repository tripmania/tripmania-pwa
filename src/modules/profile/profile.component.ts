import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDynamicComponent, IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {map, tap} from 'rxjs/operators';
import {SettingsComponent} from '@modules/settings/settings.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, IStaticComponent, IDynamicComponent {
  static ComponentName = 'ProfileComponent';

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(ProfileComponent.ComponentName);
  }

  get tripsContainerHeight$(): Observable<string> {
    return this.tripsService.trips$
      .pipe(
        map((trips: any[]) => {
          if (trips.length === 0) {
            return '300px';
          }

          return `${trips.length * 210 + 60}px`;
        })
      );
  }

  constructor(private appStateService: AppStateService,
              private tripsService: TripsService) {
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

}
