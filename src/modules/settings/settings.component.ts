import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {Router} from '@angular/router';
import {removeTokens} from '@shared/helpers/tokens.helpers';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';

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

  constructor(private router: Router,
              private appStateService: AppStateService) {
  }

  ngOnInit() {
  }

  logout() {
    removeTokens();
    this.router.navigate(['/auth/sign-in'], {replaceUrl: true});
  }

}
