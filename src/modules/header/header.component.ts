import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {map, pairwise} from 'rxjs/operators';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTopPosition$: Observable<number>;
  private lastHeaderTopPosition = 0;

  constructor() { }

  ngOnInit() {
    this.headerTopPosition$ = fromEvent(window, 'scroll', {passive: true, capture: true})
      .pipe(
        map((e: any) => e.target.scrollTop),
        pairwise(),
        map(([lastScrollTop, currentScrollTop]) => {
          const newTopPosition = this.lastHeaderTopPosition - currentScrollTop + lastScrollTop;

          this.lastHeaderTopPosition = Math.max(-50, Math.min(0, newTopPosition));

          return this.lastHeaderTopPosition;
        })
      );
  }

  ngOnDestroy() {
  }

}
