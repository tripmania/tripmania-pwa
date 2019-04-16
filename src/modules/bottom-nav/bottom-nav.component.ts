import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {IStaticViewState} from '@interfaces/IViewState';
import {staticViews} from '@consts/staticViews';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavComponent implements OnInit {
  bottomNavsViews: IStaticViewState[] = staticViews;
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
  }

  selectStaticView(view: IStaticViewState) {
    this.appStateService.openStaticView(view);
  }

  isComponentSelected(componentName: string): Observable<boolean> {
    return this.appStateService.isStaticComponentHidden(componentName)
      .pipe(
        map(hidden => !hidden)
      );
  }
}
