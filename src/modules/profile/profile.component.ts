import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HideableComponent} from '@entities/HideableComponent.entity';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {Observable} from 'rxjs';
import {AppState} from '@enums/AppState.enum';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, HideableComponent {

  constructor(private storeFacade: StoreFacadeService) {
  }

  get isComponentHidden(): Observable<boolean> {
    return this.storeFacade.isMainComponentHidden(AppState.PROFILE);
  }

  ngOnInit() {
  }

}
