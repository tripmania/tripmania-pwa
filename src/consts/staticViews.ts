import {IStaticViewState} from '@interfaces/IViewState';

export const staticViews: IStaticViewState[] = [
  {
    componentName: 'TripsListComponent',
    inputs: null,
    headerOptions: {
      title: 'Trips'
    },
    iconName: 'card_travel'
  },
  {
    componentName: 'CreatorComponent',
    inputs: null,
    headerOptions: {
      title: 'Create publication'
    },
    iconName: 'add_circle_outline'
  },
  {
    componentName: 'ProfileComponent',
    inputs: null,
    headerOptions: {
      title: 'Profile'
    },
    iconName: 'account_circle'
  },
  {
    componentName: 'SettingsComponent',
    inputs: null,
    headerOptions: {
      title: 'Settings'
    },
    iconName: 'settings'
  }
];
