import {IHeaderOptions} from '@interfaces/IHeaderOptions';

export interface IViewState {
  componentName: string;
  inputs: any;
  headerOptions: IHeaderOptions;
}

export interface IStaticViewState extends IViewState {
  iconName: string;
}
