import {Observable} from 'rxjs';

interface IComponent {
  inputs?: any;
  isComponentHidden$: Observable<boolean>;
}

export interface IDynamicComponent extends IComponent {
  componentIndex?: number;
}

export interface IStaticComponent extends IComponent {
  isStatic?: boolean; // use it if component is static and dynamic at once
}
