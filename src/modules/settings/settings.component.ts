import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, IStaticComponent {
  static ComponentName = 'SettingsComponent';

  get isComponentHidden$(): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(SettingsComponent.ComponentName);
  }

  ngOnInit() {
  }

}
