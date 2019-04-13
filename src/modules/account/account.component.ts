import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PreventHistoryBackService} from '@shared/services/prevent-history-back.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  constructor(private preventHistoryBack: PreventHistoryBackService) {
  }

  ngOnInit() {
    this.preventHistoryBack.init();
  }
}
