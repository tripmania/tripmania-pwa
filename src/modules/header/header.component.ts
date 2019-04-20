import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {combineLatest, fromEvent, Observable, Subject} from 'rxjs';
import {filter, map, skip, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  title$ = this.appStateService.headerOptions$.pipe(map(options => options.title));
  actionName$ = this.appStateService.headerOptions$.pipe(map(options => options.actionName));
  actionFunc$ = this.appStateService.headerOptions$.pipe(map(options => options.action));
  isTransparent$ = this.appStateService.headerOptions$.pipe(map(options => options.isTransparent));
  actionIsIcon$ = this.appStateService.headerOptions$.pipe(map(options => options.isIcon));

  isBackButtonVisible$ = this.appStateService.isDynamicComponentLoaded$;

  private _actionFunc: () => void;
  private destroy$ = new Subject<void>();
  private color = 'rgba(2, 119, 189, 1)';
  constructor(private appStateService: AppStateService) { }

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

  ngAfterViewInit(): void {
    this.colorOnTransparent();
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

  private colorOnTransparent() {
    fromEvent(document.querySelector('.profile-root'), 'scroll', {passive: true})
      .pipe(
        takeUntil(this.destroy$),
        map(event => `rgba(2, 119, 189, ${Math.min(event.srcElement.scrollTop, 100) / 100})`)
      )
      .subscribe(color => {
        (document.querySelector('.header') as HTMLElement).style.backgroundColor = color;
        this.color = color;
      });

    this.appStateService.isDynamicComponentLoaded$
      .pipe(
        takeUntil(this.destroy$),
        skip(1)
      )
      .subscribe(loaded => {
        if (loaded) {
          (document.querySelector('.header') as HTMLElement).style.backgroundColor = 'rgba(2, 119, 189, 1)';
        } else {
          (document.querySelector('.header') as HTMLElement).style.backgroundColor = this.color;
        }
      });
  }
}
