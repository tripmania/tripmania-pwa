import { Component, OnInit } from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {AppState} from '@enums/AppState.enum';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.less']
})
export class BottomNavComponent implements OnInit {
  activeState = this.storeFacade.activeAppState$;

  constructor(private storeFacade: StoreFacadeService) { }

  ngOnInit() {
  }

  changeAppState(appState: string) {
    this.storeFacade.changeActiveState(appState as AppState);
  }
}
