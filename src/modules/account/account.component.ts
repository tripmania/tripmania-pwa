import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PreventHistoryBackService} from '@shared/services/prevent-history-back.service';
import {UserService} from '@shared/services/user.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  constructor(private preventHistoryBack: PreventHistoryBackService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.preventHistoryBack.init();
    this.userService.loadUser();
  }
}
