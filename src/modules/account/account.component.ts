import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PreventHistoryBackService} from '@shared/services/prevent-history-back.service';
import {UserService} from '@shared/services/storeFacadeServices/user.service';
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  constructor(private preventHistoryBack: PreventHistoryBackService,
              private userService: UserService,
              private tripsService: TripsService) {
  }

  ngOnInit() {
    this.preventHistoryBack.init();
    this.userService.loadUser();
    this.tripsService.loadTrips();
  }
}
