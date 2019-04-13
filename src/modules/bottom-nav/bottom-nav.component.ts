import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {IStaticViewState} from '@interfaces/IViewState';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';
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
  constructor(private storeFacade: StoreFacadeService) { }

  ngOnInit() {
  }

  selectStaticView(view: IStaticViewState) {
    this.storeFacade.openStaticView(view);
  }

  isComponentSelected(componentName: string): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(componentName)
      .pipe(
        map(hidden => !hidden)
      );
  }
}
