import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicLoaderDirective} from '@shared/directives/dynamic-loader.directive';
import {DynamicComponent} from '@entities/DynamicComponent.entity';
import {DynamicLoaderService} from './dynamic-loader.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DynamicItem} from '@models/dynamic-item.model';

@Component({
  selector: 'dynamic-loader',
  templateUrl: './dynamic-loader.component.html',
  styleUrls: ['./dynamic-loader.component.less']
})
export class DynamicLoaderComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicLoaderDirective) adHost: DynamicLoaderDirective;
  private destroy$ = new Subject<void>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dynamicLoaderService: DynamicLoaderService) { }

  ngOnInit() {
    this.adHost.viewContainerRef.clear();

    this.initAddComponentSubscription();
    this.initRemoveComponentSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  initAddComponentSubscription() {
    this.dynamicLoaderService.addComponent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: DynamicItem) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
        const componentRef = this.adHost.viewContainerRef.createComponent(componentFactory);

        (<DynamicComponent>componentRef.instance).inputs = item.inputs;
        (<DynamicComponent>componentRef.instance).componentIndex = item.componentIndex;
      });
  }

  initRemoveComponentSubscription() {
    this.dynamicLoaderService.removeComponent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.adHost.viewContainerRef.remove();
      });
  }
}
