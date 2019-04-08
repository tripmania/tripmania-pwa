import {Component, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})
export class CreatorComponent implements OnInit {
  activeState$ = this.storeFacade.activeAppState$;

  constructor(private storeFacade: StoreFacadeService) { }

  ngOnInit() {
  }

}
