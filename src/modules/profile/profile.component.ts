import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IDynamicComponent, IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';

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

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
  }

}
