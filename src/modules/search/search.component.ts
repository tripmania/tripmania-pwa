import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
