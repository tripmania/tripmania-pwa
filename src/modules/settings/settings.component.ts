import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDynamicComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {UserService} from '@shared/services/storeFacadeServices/user.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, IDynamicComponent {
  static ComponentName = 'SettingsComponent';

  @Input() inputs: any;
  @Input() componentIndex: number;

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isDynamicComponentHidden(this);
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
