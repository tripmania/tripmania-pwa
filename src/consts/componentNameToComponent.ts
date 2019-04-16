import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';
import {ProfileComponent} from '@modules/profile/profile.component';

export const dynamicComponentNameToComponent = {
  [ProfileComponent.ComponentName]: ProfileComponent as Type<IDynamicComponent>,
  [TripDetailsComponent.ComponentName]: TripDetailsComponent as Type<IDynamicComponent>
};
