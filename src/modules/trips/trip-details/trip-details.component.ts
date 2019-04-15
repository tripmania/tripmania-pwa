import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ITrip} from '@interfaces/dto/ITrip';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IDynamicComponent} from '@interfaces/IComponent';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {Observable, Subject} from 'rxjs';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {MatDialog} from '@angular/material';
import {DeleteTripDialogComponent} from '@modules/trips/delete-trip-dialog/delete-trip-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {markFormGroupTouched} from '@shared/helpers/markFormGroupTouched';

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
  private headerAction: () => void;

  get tripPaths(): Array<{from: string, to: string}> {
    return this._tripPaths;
  }

  get isComponentHidden$(): Observable<boolean> {
    return DynamicLoaderService.IsComponentHidden(this);
  }

  constructor(private formBuilder: FormBuilder,
              private appStateService: AppStateService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.initComponentInputs();
    this.initForm();
    this.initTripPaths();
    this.initSaveAction();
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
      .subscribe(destroy => {
        if (destroy) {
          console.log('удаляю трип');
          this.appStateService.goToBackView();
        }
      });
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

  private initSaveAction() {
    if (this.forTripCreation) {
      this.headerAction = () => {
        if (this.form.invalid) {
          markFormGroupTouched(this.form);
          this.changeDetector.markForCheck();
        } else {
          console.log('сохраняю трип');
          this.appStateService.goToBackView();
        }
      };
    } else {
      this.headerAction = () => {
        if (this.form.invalid) {
          markFormGroupTouched(this.form);
          this.changeDetector.markForCheck();
        } else {
          console.log('обновляю трип');
          this.appStateService.goToBackView();
        }
      };
    }

    this.appStateService.setHeaderAction('Save', this.headerAction);
  }
}
