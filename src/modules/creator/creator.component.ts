import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})
export class CreatorComponent implements OnInit, IStaticComponent {
  static ComponentName = 'CreatorComponent';

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(CreatorComponent.ComponentName);
  }

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
  }

}
