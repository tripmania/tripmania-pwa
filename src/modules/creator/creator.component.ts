import {Component, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {HideableComponent} from '@entities/HideableComponent.entity';
import {Observable} from 'rxjs';
import {AppState} from '@enums/AppState.enum';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})
export class CreatorComponent implements OnInit, HideableComponent {
  constructor(private storeFacade: StoreFacadeService) { }

  get isComponentHidden(): Observable<boolean> {
    return this.storeFacade.isMainComponentHidden(AppState.CREATOR);
  }

  ngOnInit() {
  }

}
