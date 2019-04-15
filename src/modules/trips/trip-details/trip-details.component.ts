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
import {TripsService} from '@shared/services/storeFacadeServices/trips.service';
import {FilesService} from '@shared/services/files.service';

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
  photoToUpload: File;
  photoUrlToUpload = '';
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
              private tripsService: TripsService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef,
              private filesService: FilesService) { }

  ngOnInit() {
    this.initComponentInputs();
    this.initForm();
    this.initTripPaths();
    this.initSaveAction();
    this.initLocalPhoto();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onFileUpload(event) {
    this.photoToUpload = event.target.files[0];
    this.photoUrlToUpload = window.URL.createObjectURL(this.photoToUpload);
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
          this.appStateService.goToBackView();
          this.tripsService.deleteTrip(this.trip.id);
        }
      });
  }

  private initLocalPhoto() {
    if (!this.trip) {
      return;
    }

    this.filesService.loadFileToUrl(this.trip.photoUrl)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(url => {
        this.changeDetector.markForCheck();
        this.trip.localPhotoUrl = url;
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
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]]
    });
  }

  private initTripPaths() {
    if (!this.forTripCreation && this.trip.path.length > 0) {
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
          this.tripsService.addTrip(this.createTripToSave(), this.photoToUpload);
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

  private createTripToSave(): ITrip {
    const path = [];
    let i = 0;

    while (i < this._tripPaths.length && this._tripPaths[i].from !== '' && this._tripPaths[i].to !== '') {
      if (i === 0) {
        path.push(this._tripPaths[i].from);
        if (this._tripPaths[i].from !== this._tripPaths[i].to) {
          path.push(this._tripPaths[i].to);
        }
      } else {
        if (path[path.length - 1] !== this._tripPaths[i].from) {
          path.push(this._tripPaths[i].from);
        }

        if (path[path.length - 1] !== this._tripPaths[i].to) {
          path.push(this._tripPaths[i].to);
        }
      }

      i += 1;
    }

    return {
      title: this.form.get('title').value,
      startDate: Date.parse(this.form.get('startDate').value),
      endDate: Date.parse(this.form.get('endDate').value),
      path
    };
  }
}
