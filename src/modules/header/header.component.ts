import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService} from '@shared/services/app-state.service';
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
  title$ = this.appStateService.headerTitle$;
  actionName$ = this.appStateService.headerActionName$;
  actionFunc$ = this.appStateService.headerActionFunc$;

  private _actionFunc: () => void;
  private destroy$ = new Subject<void>();

  constructor(private appStateService: AppStateService) { }

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
    this.appStateService.goToBackView();
  }

  onActionClick() {
    if (!!this._actionFunc) {
      this._actionFunc();
    }
  }
}
