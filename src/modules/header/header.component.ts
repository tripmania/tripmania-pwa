import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  title$ = this.storeFacade.headerTitle$;
  actionName$ = this.storeFacade.headerActionName$;
  actionFunc$ = this.storeFacade.headerActionFunc$;

  private _actionFunc: () => void;
  private destroy$ = new Subject<void>();

  constructor(private storeFacade: StoreFacadeService) { }

  get isBackButtonVisible$(): Observable<boolean> {
    return DynamicLoaderService.isDynamicComponentLoaded();
  }

  get isActionButtonVisible$(): Observable<boolean> {
    return combineLatest(
      this.actionName$,
      this.actionFunc$
    )
      .pipe(
        map(([name, func]) => !!name && !!func)
      );
  }

  ngOnInit() {
    this.actionFunc$
      .pipe(
        takeUntil(this.destroy$),
        filter(func => !!func)
      )
      .subscribe(func => {
        this._actionFunc = func;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  goBack() {
    this.storeFacade.goToBackView();
  }

  onActionClick() {
    if (!!this._actionFunc) {
      this._actionFunc();
    }
  }
}
