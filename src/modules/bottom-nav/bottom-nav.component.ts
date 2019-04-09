import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {AppState} from '@enums/AppState.enum';
import {map} from 'rxjs/operators';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavComponent implements OnInit {
  constructor(private storeFacade: StoreFacadeService) { }

  ngOnInit() {
  }

  changeAppState(appState: string) {
    this.storeFacade.changeStaticState(appState as AppState);
  }

  isStateSelected(appState: string) {
    return this.storeFacade.isStaticComponentHidden(appState as AppState)
      .pipe(
        map(isHidden => !isHidden)
      );
  }
}
