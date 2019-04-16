import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicContainerDirective} from '@shared/directives/dynamic-container/dynamic-container.directive';
import {IDynamicComponent} from '@interfaces/IComponent';
import {Subject} from 'rxjs';
import {filter, map, pairwise, takeUntil} from 'rxjs/operators';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {dynamicComponentNameToComponent} from '@consts/componentNameToComponent';
import {IDynamicViewState} from '@interfaces/IViewState';

@Component({
  selector: 'dynamic-loader',
  templateUrl: './dynamic-loader.component.html',
  styleUrls: ['./dynamic-loader.component.less']
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicContainerDirective) dynamicHost: DynamicContainerDirective;
  isDynamicComponentsLoaded$ = this.appStateService.isDynamicComponentLoaded$;
  private destroy$ = new Subject<void>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appStateService: AppStateService) { }

  ngOnInit() {
    this.dynamicHost.viewContainerRef.clear();

    this.initAddComponentSubscription();
    this.initRemoveComponentSubscription();
    this.initRemoveAllSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  initAddComponentSubscription() {
    this.appStateService.allDynamicStates$
      .pipe(
        takeUntil(this.destroy$),
        pairwise(),
        filter(([firstDynamicStates, secondDynamicStates]) => secondDynamicStates.length > firstDynamicStates.length),
        map(([firstDynamicStates, secondDynamicStates]) => secondDynamicStates[secondDynamicStates.length - 1])
      )
      .subscribe((dynamicState: IDynamicViewState) => {
        const componentFactory = this.componentFactoryResolver
          .resolveComponentFactory(dynamicComponentNameToComponent[dynamicState.componentName]);
        const componentRef = this.dynamicHost.viewContainerRef.createComponent(componentFactory);

        (<IDynamicComponent>componentRef.instance).inputs = dynamicState.inputs;
        (<IDynamicComponent>componentRef.instance).componentIndex = dynamicState.componentIndex;
      });
  }

  initRemoveComponentSubscription() {
    this.appStateService.allDynamicStates$
      .pipe(
        takeUntil(this.destroy$),
        pairwise(),
        filter(([firstDynamicStates, secondDynamicStates]) =>
          secondDynamicStates.length === firstDynamicStates.length - 1
          && secondDynamicStates.length !== 0),
      )
      .subscribe(() => {
        if (this.dynamicHost.viewContainerRef.length) {
          this.dynamicHost.viewContainerRef.remove();
        }
      });
  }

  initRemoveAllSubscription() {
    this.appStateService.activeDynamicState$
      .pipe(
        takeUntil(this.destroy$),
        filter(dynamicState => !dynamicState)
      )
      .subscribe(() => {
        if (this.dynamicHost.viewContainerRef.length) {
          this.dynamicHost.viewContainerRef.clear();
        }
      });
  }
}
