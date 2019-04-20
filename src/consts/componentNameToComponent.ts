import {TripDetailsComponent} from '@modules/trips/trip-details/trip-details.component';
import {Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';
import {ProfileComponent} from '@modules/profile/profile.component';
import {SettingsComponent} from '@modules/settings/settings.component';
import {ProfileEditorComponent} from '@modules/profile/profile-editor/profile-editor.component';

export const dynamicComponentNameToComponent = {
  [ProfileComponent.ComponentName]: ProfileComponent as Type<IDynamicComponent>,
  [TripDetailsComponent.ComponentName]: TripDetailsComponent as Type<IDynamicComponent>,
  [SettingsComponent.ComponentName]: SettingsComponent as Type<IDynamicComponent>,
  [ProfileEditorComponent.ComponentName]: ProfileEditorComponent as Type<IDynamicComponent>
};
