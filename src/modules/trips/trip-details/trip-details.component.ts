import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDynamicComponent} from '@interfaces/IComponent';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {Observable, Subject} from 'rxjs';
import {StoreFacadeService} from '@shared/services/storeFacade.service';
import {MatDialog} from '@angular/material';
import {DeleteTripDialogComponent} from '@modules/trips/delete-trip-dialog/delete-trip-dialog.component';
import {takeUntil} from 'rxjs/operators';

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
export class TripDetailsComponent implements OnInit, OnDestroy, IDynamicComponent {
  static ComponentName = 'TripDetailsComponent';

  @Input() inputs: DynamicInputs;
  @Input() componentIndex: number;

  @Input() forTripCreation: boolean;
  @Input() trip: ITrip;
  form: FormGroup;
  photoToUpload = '';
  private _tripPaths = [{from: '', to: ''}];
  private destroy$ = new Subject<void>();

  get tripPaths(): Array<{from: string, to: string}> {
    return this._tripPaths;
  }

  get isComponentHidden$(): Observable<boolean> {
    return DynamicLoaderService.IsComponentHidden(this);
  }

  constructor(private formBuilder: FormBuilder,
              private storeFacade: StoreFacadeService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initComponentInputs();
    this.initForm();
    this.initTripPaths();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onFileUpload(event) {
    const selectedFile: File = event.target.files[0];
    this.photoToUpload = window.URL.createObjectURL(selectedFile);
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

  onDeleteTrip() {
    const dialogRef = this.dialog.open(DeleteTripDialogComponent, {
      width: '250px',
      data: {title: this.trip.title}
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private initComponentInputs() {
    if (this.inputs) {
      this.forTripCreation = this.inputs.forTripCreation || this.forTripCreation;
      this.trip = this.inputs.trip || this.trip;
    }
  }

  private initForm() {
    const title = this.forTripCreation ? '' : this.trip.title;
    const startDate = (!this.forTripCreation && this.trip.startDate) ? new Date(this.trip.startDate) : '';
    const endDate = (!this.forTripCreation && this.trip.endDate) ? new Date(this.trip.endDate) : '';

    this.form = this.formBuilder.group({
      title: [title, [Validators.required, Validators.maxLength(150)]],
      startDate: [startDate],
      endDate: [endDate]
    });
  }

  private initTripPaths() {
    if (!this.forTripCreation && this.trip.path) {
      this._tripPaths = [];
      for (let i = 0; i < this.trip.path.length - 1; i++) {
        const path = {from: this.trip.path[i], to: this.trip.path[i + 1]};
        this._tripPaths.push(path);
      }
    }
  }
}
