import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IStaticComponent} from '@interfaces/IComponent';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';

@Component({
  selector: 'creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})
export class CreatorComponent implements OnInit, IStaticComponent {
  static ComponentName = 'CreatorComponent';

  get isComponentHidden$(): Observable<boolean> {
    return StaticLoaderService.isComponentHidden(CreatorComponent.ComponentName);
  }

  ngOnInit() {
  }

}
