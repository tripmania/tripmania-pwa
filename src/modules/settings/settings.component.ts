import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IHideableComponent} from '@interfaces/IHideableComponent';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {Observable} from 'rxjs';
import {AppState} from '@enums/AppState.enum';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, IHideableComponent {

  constructor(private storeFacade: StoreFacadeService) {
  }

  get isComponentHidden(): Observable<boolean> {
    return this.storeFacade.isStaticComponentHidden(AppState.SETTINGS);
  }

  ngOnInit() {
  }

}
