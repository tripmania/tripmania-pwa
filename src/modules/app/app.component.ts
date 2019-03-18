import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TripMania!!';

  constructor(private updates: SwUpdate) {
    updates.available.subscribe(() => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
