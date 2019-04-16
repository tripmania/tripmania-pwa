import {IHeaderOptions} from '@interfaces/IHeaderOptions';

interface IViewState {
  componentName: string;
  inputs: any;
  headerOptions: IHeaderOptions;
}

export interface IStaticViewState extends IViewState {
  iconName: string;
}

export interface IDynamicViewState extends IViewState {
  componentIndex?: number;
}
