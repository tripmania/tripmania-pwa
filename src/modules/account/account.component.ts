import { Component, OnInit } from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  activeState = this.storeFacade.activeAppState$;

  constructor(private storeFacade: StoreFacadeService) { }

  ngOnInit() {
  }
}
