import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDynamicComponent, IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {SettingsComponent} from '@modules/settings/settings.component';
import {UserService} from '@shared/services/storeFacadeServices/user.service';
import {ProfileEditorComponent} from '@modules/profile/profile-editor/profile-editor.component';
import {FilesService} from '@shared/services/files.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, IStaticComponent, IDynamicComponent {
  static ComponentName = 'ProfileComponent';
  userPhoto = '';
  userName$ = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user.name)
  );
  userStatus$ = this.userService.user$.pipe(
    filter(user => !!user),
    map(user => user.status)
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
  userPlaces$ = this.tripsService.trips$
    .pipe(
      filter(trips => !!trips),
      map(trips => {
        const unique = new Set();

        trips.forEach(trip => {
          trip.path.forEach(path => unique.add(path));
        });

        return unique.size;
      })
    );

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(ProfileComponent.ComponentName);
  }

  constructor(private appStateService: AppStateService,
              private tripsService: TripsService,
              private userService: UserService,
              private filesService: FilesService,
              private changeDetector: ChangeDetectorRef) {
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

    this.userService.user$
      .pipe(
        filter(user => !!user),
        map(user => user.photoUrl),
        switchMap(photoUrl => this.filesService.loadFileToUrl(photoUrl))
      )
      .subscribe(photo => {
        this.changeDetector.markForCheck();
        this.userPhoto = photo;
      });
  }

  onPhotoUpload(event) {
    const photo = event.target.files[0];

    this.changeDetector.markForCheck();
    this.userPhoto = window.URL.createObjectURL(photo);
    this.userService.updateUserPhoto(photo);
  }

  editProfile() {
    this.appStateService.openDynamicView(
      ProfileEditorComponent,
      {
        componentName: ProfileEditorComponent.ComponentName,
        inputs: null,
        headerOptions: {
          title: 'Edit profile',
          action: () => {},
          actionName: 'done',
          isIcon: true
        }
      }
    );
  }
}
