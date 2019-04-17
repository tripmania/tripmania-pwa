import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';
import {ProfileComponent} from '@modules/profile/profile.component';
import {SettingsComponent} from '@modules/settings/settings.component';

export const dynamicComponentNameToComponent = {
  [ProfileComponent.ComponentName]: ProfileComponent as Type<IDynamicComponent>,
  [TripDetailsComponent.ComponentName]: TripDetailsComponent as Type<IDynamicComponent>,
  [SettingsComponent.ComponentName]: SettingsComponent as Type<IDynamicComponent>
};
