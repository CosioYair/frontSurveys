import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { User } from 'src/app/shared/model/user';
import { Employee } from 'src/app/shared/model/employee';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { take } from 'rxjs/operators';
import { Gender } from 'src/app/shared/model/gender';
import { GenderService } from 'src/app/shared/services/gender.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ContractTypeService } from 'src/app/shared/services/contract-type.service';
import { WorkingDayTypeService } from 'src/app/shared/services/working-day-type.service';
import { StudyLevelService } from 'src/app/shared/services/study-level.service';
import { PositionTypeService } from 'src/app/shared/services/position-type.service';
import { StaffTypeService } from 'src/app/shared/services/staff-type.service';
import { CivilStatusService } from 'src/app/shared/services/civil-status.service';
import { ContractType } from 'src/app/shared/model/contract-type';
import { WorkingDayType } from 'src/app/shared/model/working-day-type';
import { StudyLevel } from 'src/app/shared/model/study-level';
import { PositionType } from 'src/app/shared/model/position-type';
import { StaffType } from 'src/app/shared/model/staff-type';
import { CivilStatus } from 'src/app/shared/model/civil-status';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from 'src/app/shared/model/role';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public backErrors: BackError[] = [];
  public genders: Gender[] = [];
  public contractTypes: ContractType[] = [];
  public workingDayTypes: WorkingDayType[] = [];
  public studyLevels: StudyLevel[] = [];
  public positionTypes: PositionType[] = [];
  public staffTypes: StaffType[] = [];
  public civilStatuses: CivilStatus[] = [];
  public roles: Role[] = [];
  public employeeCreated: boolean = false;
  private _user: User = {} as User;
  public employee: Employee = {} as Employee;
  private _subscriptions: Subscription[] = [];

  constructor(public userService: UserService,
    public companyService: CompanyService,
    public genderService: GenderService,
    public contractTypeService: ContractTypeService,
    public workingDayTypeService: WorkingDayTypeService,
    public studyLevelService: StudyLevelService,
    public positionTypeService: PositionTypeService,
    public staffTypeService: StaffTypeService,
    public civilStatusService: CivilStatusService,
    public roleService: RoleService
  ) {
    this.setDefaultForm();
  }

  ngOnInit() {
    this._subscriptions.push(
      this.userService.getUser.subscribe(user => {
        this._user = user;
      })
    );
    this.getRoles();
    this.getGenders();
    this.getContractTypes();
    this.getWorkingDayTypes();
    this.getStudyLevels();
    this.getPositionTypes();
    this.getStaffTypes();
    this.getCivilStatuses();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setDefaultForm() {
    this.form = new FormGroup({
      tagName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      roleId: new FormControl(null, [
        Validators.required,
      ]),
      fullName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      age: new FormControl(null, [
        Validators.required,
      ]),
      genderId: new FormControl(null, [
        Validators.required,
      ]),
      civilStatusId: new FormControl(null, [
        Validators.required,
      ]),
      studyLevelId: new FormControl(null, [
        Validators.required,
      ]),
      position: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      positionTypeId: new FormControl(null, [
        Validators.required,
      ]),
      contractTypeId: new FormControl(null, [
        Validators.required,
      ]),
      staffTypeId: new FormControl(null, [
        Validators.required,
      ]),
      workingDayTypeId: new FormControl(null, [
        Validators.required,
      ]),
      rotation: new FormControl(null, [
        Validators.required,
      ]),
      positionStartDate: new FormControl({
        disabled: true,
        value: null,
      }, [
        Validators.required,
      ]),
      experienceYears: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  public getRoles() {
    this.roleService.index().pipe(take(1))
      .subscribe(roles => {
        this.roles = roles;
      });
  }

  public getGenders() {
    this.genderService.index().pipe(take(1))
      .subscribe(genders => {
        this.genders = genders;
      });
  }

  public getContractTypes() {
    this.contractTypeService.index().pipe(take(1))
      .subscribe(contractTypes => {
        this.contractTypes = contractTypes;
      });
  }

  public getWorkingDayTypes() {
    this.workingDayTypeService.index().pipe(take(1))
      .subscribe(workingDayTypes => {
        this.workingDayTypes = workingDayTypes;
      });
  }
  public getPositionTypes() {
    this.positionTypeService.index().pipe(take(1))
      .subscribe(positionTypes => {
        this.positionTypes = positionTypes;
      });
  }

  public getStudyLevels() {
    this.studyLevelService.index().pipe(take(1))
      .subscribe(studyLevels => {
        this.studyLevels = studyLevels;
      });
  }

  public getStaffTypes() {
    this.staffTypeService.index().pipe(take(1))
      .subscribe(staffTypes => {
        this.staffTypes = staffTypes;
      });
  }

  public getCivilStatuses() {
    this.civilStatusService.index().pipe(take(1))
      .subscribe(civilStatuses => {
        this.civilStatuses = civilStatuses;
      });
  }

  public create() {
    const employee = this.form.getRawValue();
    const user: User = {
      tagName: employee.tagName,
      email: employee.email,
    };
    const roleId = employee.roleId;
    this.companyService.newEmployee(this._user.companyOid, user, employee, roleId).pipe(
      take(1)
    ).subscribe(() => {
      this.form.reset();
      this.employeeCreated = true;
      this.backErrors = [];
    }, (err) => {
      this.employeeCreated = false;
      this.backErrors = err.error;
    });
  }

}
