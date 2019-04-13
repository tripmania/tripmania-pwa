import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicContainerDirective} from '@shared/directives/dynamic-container/dynamic-container.directive';
import {IDynamicComponent} from '@interfaces/IComponent';
import {DynamicLoaderService} from './dynamic-loader.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicItem} from '@models/dynamic-item';

@Component({
  selector: 'dynamic-loader',
  templateUrl: './dynamic-loader.component.html',
  styleUrls: ['./dynamic-loader.component.less']
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicContainerDirective) dynamicHost: DynamicContainerDirective;
  isDynamicComponentsLoaded$ = DynamicLoaderService.isDynamicComponentLoaded();
  private destroy$ = new Subject<void>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dynamicLoaderService: DynamicLoaderService) { }

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
    this.dynamicLoaderService.addComponent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: DynamicItem) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
        const componentRef = this.dynamicHost.viewContainerRef.createComponent(componentFactory);

        (<IDynamicComponent>componentRef.instance).inputs = item.inputs;
        (<IDynamicComponent>componentRef.instance).componentIndex = item.componentIndex;
      });
  }

  initRemoveComponentSubscription() {
    this.dynamicLoaderService.removeComponent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.dynamicHost.viewContainerRef.length) {
          this.dynamicHost.viewContainerRef.remove();
        }
      });
  }

  initRemoveAllSubscription() {
    this.dynamicLoaderService.removeAllComponents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.dynamicHost.viewContainerRef.length) {
          this.dynamicHost.viewContainerRef.clear();
        }
      });
  }
}
