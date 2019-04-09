import {Observable} from 'rxjs';

export interface HideableComponent {
  isComponentHidden: boolean | Observable<boolean>;
}
