import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {UserService} from '@shared/services/storeFacadeServices/user.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, IStaticComponent {
  static ComponentName = 'SettingsComponent';

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(SettingsComponent.ComponentName);
  }

  constructor(private appStateService: AppStateService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
