import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/ITrip';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDynamicComponent} from '@interfaces/IDynamicComponent';
import {DynamicLoaderService} from '../../dynamic-loader/dynamic-loader.service';
import {IHideableComponent} from '@interfaces/IHideableComponent';

interface DynamicInputs {
  forTripCreation: boolean;
  trip: ITrip;
}

@Component({
  selector: 'trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripDetailsComponent implements OnInit, IDynamicComponent, IHideableComponent {
  @Input() inputs: DynamicInputs;
  @Input() componentIndex: number;

  @Input() forTripCreation: boolean;
  @Input() trip: ITrip;
  form: FormGroup;
  private _tripPaths = [{from: '', to: ''}];

  get tripPaths(): Array<{from: string, to: string}> {
    return this._tripPaths;
  }

  get isComponentHidden(): boolean {
    return DynamicLoaderService.IsComponentHidden(this);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forTripCreation = this.inputs.forTripCreation || this.forTripCreation;
    this.trip = this.inputs.trip || this.trip;

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
