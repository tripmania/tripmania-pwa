import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';
import {Observable} from 'rxjs';
import {AppStateService} from '@shared/services/storeFacadeServices/app-state.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@shared/services/storeFacadeServices/user.service';
import {markFormGroupTouched} from '@shared/helpers/markFormGroupTouched';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.less']
})
export class ProfileEditorComponent implements OnInit, IDynamicComponent {
  static ComponentName = 'ProfileEditorComponent';
  form: FormGroup;

  get isComponentHidden$(): Observable<boolean> {
    return this.appStateService.isDynamicComponentHidden(this);
  }

  constructor(private appStateService: AppStateService,
              private fb: FormBuilder,
              private userService: UserService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: ['']
    });

    this.userService.user$
      .pipe(
        filter(user => !!user),
        take(1)
      )
      .subscribe(user => {
        this.form.get('name').setValue(user.name);
        this.form.get('status').setValue(user.status);
        this.changeDetector.detectChanges();
      });

    this.setHeaderAction();
  }

  private setHeaderAction() {
    const headerAction = () => {
      if (this.form.invalid) {
        markFormGroupTouched(this.form);
        this.changeDetector.markForCheck();
      } else {
        const name = this.form.get('name').value;
        const status = this.form.get('status').value;

        this.userService.updateUserInfo(name, status);
        this.appStateService.goToBackView();
      }
    };

    this.appStateService.setHeaderAction('done', headerAction, true);
  }
}
