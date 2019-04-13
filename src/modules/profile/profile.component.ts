import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, IStaticComponent {
  static ComponentName = 'ProfileComponent';

  get isComponentHidden$(): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(ProfileComponent.ComponentName);
  }

  ngOnInit() {
  }

}
