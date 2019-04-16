import {Injectable} from '@angular/core';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {filter, map, pairwise, take, tap} from 'rxjs/operators';

@Injectable()
export class PreventHistoryBackService {
  constructor(private appStateService: AppStateService) {
  }

  init() {
    this.listenPopState();
    this.pushStateOnDynamicOpen();
  }

  private listenPopState() {
    window.addEventListener('popstate', () => {
      this.appStateService.isDynamicComponentLoaded$
        .pipe(
          take(1),
          filter(isLoaded => isLoaded)
        )
        .subscribe(() => {
          this.appStateService.goToBackView();
          history.replaceState(null, null, location.href);
        });
    });
  }

  private pushStateOnDynamicOpen() {
    this.appStateService.activeDynamicState$
      .pipe(
        map(dynamicState => {
          if (!dynamicState) {
            return 0;
          }

          return dynamicState.componentIndex;
        }),
        pairwise(),
        tap(([first, second]) => {
          if (second > first) {
            history.pushState(null, null, location.href);
          }
        }),
      )
      .subscribe();
  }
}
