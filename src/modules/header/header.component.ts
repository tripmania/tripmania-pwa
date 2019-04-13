import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = this.storeFacade.headerTitle$;

  constructor(private storeFacade: StoreFacadeService) { }

  get isBackButtonVisible(): boolean {
    return false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  goBack() {
    this.storeFacade.goToBackView();
  }
}
