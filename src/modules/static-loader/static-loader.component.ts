import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicContainerDirective} from '@shared/directives/dynamic-container/dynamic-container.directive';
import {IStaticComponent} from '@interfaces/IComponent';
import {TripsListComponent} from '@modules/trips/trips-list/trips-list.component';
import {CreatorComponent} from '@modules/creator/creator.component';
import {ProfileComponent} from '@modules/profile/profile.component';
import {SettingsComponent} from '@modules/settings/settings.component';
import {staticViews} from '@consts/staticViews';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';

const componentByName = {
  TripsListComponent: TripsListComponent,
  CreatorComponent: CreatorComponent,
  ProfileComponent: ProfileComponent,
  SettingsComponent: SettingsComponent
};

@Component({
  selector: 'static-loader',
  templateUrl: './static-loader.component.html',
  styleUrls: ['./static-loader.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaticLoaderComponent implements OnInit {
  @ViewChild(DynamicContainerDirective) staticHost: DynamicContainerDirective;
  isStaticComponentsHidden$ = this.appStateService.isDynamicComponentLoaded$;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appStateService: AppStateService) { }

  ngOnInit() {
    this.initStaticViews();
  }

  initStaticViews() {
    for (const view of staticViews) {
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(componentByName[view.componentName] as Type<IStaticComponent>);
      const componentRef = this.staticHost.viewContainerRef.createComponent(componentFactory);

      (<IStaticComponent>componentRef.instance).inputs = view.inputs;
      (<IStaticComponent>componentRef.instance).isStatic = true;
    }
  }

}
