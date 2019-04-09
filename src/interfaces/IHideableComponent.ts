import {Observable} from 'rxjs';

export interface IHideableComponent {
  isComponentHidden: boolean | Observable<boolean>;
  isVisibleImportant?: boolean | Observable<boolean>;
}
