import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TripModel} from '@models/Trip.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripDetailsComponent implements OnInit {
  @Input() forTripCreation: boolean;
  @Input() trip: TripModel;
  form: FormGroup;
  private _tripPaths = [{from: '', to: ''}];

  get tripPaths(): Array<{from: string, to: string}> {
    return this._tripPaths;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [(this.forTripCreation ? '' : this.trip.title), [Validators.required, Validators.maxLength(150)]],
      startDate: [(!this.forTripCreation && this.trip.startDate ? new Date(this.trip.startDate) : '')],
      endDate: [(!this.forTripCreation && this.trip.endDate ? new Date(this.trip.endDate) : '')]
    });

    if (!this.forTripCreation && this.trip.path) {
      this._tripPaths = [];
      for (let i = 0; i < this.trip.path.length - 1; i++) {
        const path = {from: this.trip.path[i], to: this.trip.path[i + 1]};
        this._tripPaths.push(path);
      }
    }
  }

  onAddPathRow() {
    const tripsLen = this._tripPaths.length;
    const lastFrom = this._tripPaths[tripsLen - 1].from;
    const lastTo = this._tripPaths[tripsLen - 1].to;

    if (lastFrom === '' || lastTo === '') {
      return;
    }

    this._tripPaths.push({from: lastTo, to: ''});
  }

  onDeletePathRow() {
    if (this._tripPaths) {
      this._tripPaths.pop();
    }

    if (this._tripPaths.length === 0) {
      this._tripPaths.push({from: '', to: ''});
    }
  }
}
