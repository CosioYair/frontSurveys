import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { Employee } from 'src/app/shared/model/employee';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { take } from 'rxjs/operators';
import { BackError } from 'src/app/shared/model/backError';
import { GenderService } from 'src/app/shared/services/gender.service';
import { ContractTypeService } from 'src/app/shared/services/contract-type.service';
import { WorkingDayTypeService } from 'src/app/shared/services/working-day-type.service';
import { StudyLevelService } from 'src/app/shared/services/study-level.service';
import { PositionTypeService } from 'src/app/shared/services/position-type.service';
import { StaffTypeService } from 'src/app/shared/services/staff-type.service';
import { CivilStatusService } from 'src/app/shared/services/civil-status.service';
import { Gender } from 'src/app/shared/model/gender';
import { ContractType } from 'src/app/shared/model/contract-type';
import { WorkingDayType } from 'src/app/shared/model/working-day-type';
import { StudyLevel } from 'src/app/shared/model/study-level';
import { PositionType } from 'src/app/shared/model/position-type';
import { StaffType } from 'src/app/shared/model/staff-type';
import { CivilStatus } from 'src/app/shared/model/civil-status';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  private _user: User = {} as User;
  public employee: Employee = {} as Employee;
  public gender: Gender = {} as Gender;
  public contractType: ContractType = {} as ContractType;
  public workingDayType: WorkingDayType = {} as WorkingDayType;
  public studyLevel: StudyLevel = {} as StudyLevel;
  public positionType: PositionType = {} as PositionType;
  public staffType: StaffType = {} as StaffType;
  public civilStatus: CivilStatus = {} as CivilStatus;
  private _subscriptions: Subscription[] = [];
  public backErrors: BackError[] = [];

  constructor(public userService: UserService,
    public employeeService: EmployeeService,
    public genderService: GenderService,
    public contractTypeService: ContractTypeService,
    public workingDayTypeService: WorkingDayTypeService,
    public studyLevelService: StudyLevelService,
    public positionTypeService: PositionTypeService,
    public staffTypeService: StaffTypeService,
    public civilStatusService: CivilStatusService,
  ) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this.userService.getUser.subscribe(user => {
        this._user = user;
        if (user.Oid) {
          this.getEmployee();
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getEmployee() {
    this.userService.getEmployee(this._user.Oid).pipe(
      take(1)
    ).subscribe(employee => {
      this.employee = employee;
      this.getGender();
      this.getContractType();
      this.getWorkingDayType();
      this.getStudyLevel();
      this.getPositionType();
      this.getStaffType();
      this.getCivilStatus();
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public getGender() {
    this.genderService.index().pipe(take(1))
      .subscribe(genders => {
        this.gender = genders.find(item => item.id = this.employee.genderId);
      });
  }

  public getContractType() {
    this.contractTypeService.index().pipe(take(1))
      .subscribe(contractTypes => {
        this.contractType = contractTypes.find(item => item.id = this.employee.contractTypeId);
      });
  }

  public getWorkingDayType() {
    this.workingDayTypeService.index().pipe(take(1))
      .subscribe(workingDayTypes => {
        this.workingDayType = workingDayTypes.find(item => item.id = this.employee.workingDayTypeId);
      });
  }
  public getPositionType() {
    this.positionTypeService.index().pipe(take(1))
      .subscribe(positionTypes => {
        this.positionType = positionTypes.find(item => item.id = this.employee.positionTypeId);
      });
  }

  public getStudyLevel() {
    this.studyLevelService.index().pipe(take(1))
      .subscribe(studyLevels => {
        this.studyLevel = studyLevels.find(item => item.id = this.employee.studyLevelId);
      });
  }

  public getStaffType() {
    this.staffTypeService.index().pipe(take(1))
      .subscribe(staffTypes => {
        this.staffType = staffTypes.find(item => item.id = this.employee.staffTypeId);
      });
  }

  public getCivilStatus() {
    this.civilStatusService.index().pipe(take(1))
      .subscribe(civilStatuses => {
        this.civilStatus = civilStatuses.find(item => item.id = this.employee.civilStatusId);
      });
  }

}
