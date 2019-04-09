import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  ngOnInit() {
  }
}
