import {Injectable} from '@angular/core';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {pairwise, tap} from 'rxjs/operators';

@Injectable()
export class PreventHistoryBackService {
  constructor(private storeFacade: StoreFacadeService) {
  }

  init() {
    this.listenPopState();
    this.pushStateOnDynamicOpen();
  }

  private listenPopState() {
    window.addEventListener('popstate', () => {
      if (DynamicLoaderService.isDynamicComponentLoadedSync()) {
        this.storeFacade.goToBackView();
        history.replaceState(null, null, location.href);
      }
    });
  }

  private pushStateOnDynamicOpen() {
    DynamicLoaderService._currentDynamicComponentIndex$
      .pipe(
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
