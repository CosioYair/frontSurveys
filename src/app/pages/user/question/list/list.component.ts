import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../question';
import { BackError } from 'src/app/shared/model/backError';
import { Observable, Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { TableColumn } from 'src/app/shared/model/table-column';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from 'src/app/shared/services/user.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { TableService } from 'src/app/shared/services/table.service';
import { take, startWith, map } from 'rxjs/operators';
import { QuestionService } from '../question.service';
import { AnswerTypeService } from 'src/app/shared/services/answer-type.service';
import { AnswerType } from 'src/app/shared/model/answer-type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public backErrors: BackError[] = [];
  public questions$: Observable<Question[]>;
  public filter = new FormControl('');
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];
  public recordDeleted: boolean = false;
  public displayedColumns: TableColumn[] = [{
    key: 'title',
    title: 'Pregunta'
  }, {
    key: 'answerTypeTitle',
    title: 'Tipo de respuesta'
  }];
  public records: any[] = [];
  public page: number = 1;
  public pageSize: number = 30;
  public total: number = 0;
  public dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>([]);
  public selection = new SelectionModel<Question>(true, []);
  public answerTypes: AnswerType[] = [];

  constructor(private _userService: UserService,
    private _companyService: CompanyService,
    private _questionService: QuestionService,
    private _tableService: TableService,
    private _answerTypeService: AnswerTypeService
  ) {
  }

  async ngOnInit() {
    await this.getAnswerTypes();
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this._user = user;
        this.getQuestions(user.companyOid);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getAnswerTypes() {
    return this._answerTypeService.index().toPromise()
      .then(answerTypes => {
        this.answerTypes = answerTypes;
      });
  }

  public getQuestions(oid: string) {
    this._companyService.getQuestions(oid).subscribe(questions => {
      questions = questions.filter(question => {
        if (question.companyOid) {
          question.answerTypeTitle = (this.answerTypes.find(answerType => answerType.id == question.answerTypeId)).title;
        }
        return !!question.companyOid;
      });
      this.dataSource = new MatTableDataSource<Question>(questions);
      this.questions$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => {
          this.records = this._tableService.search(questions, text, this.displayedColumns);
          this.total = this.records.length;
          return this.records.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        })
      );
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public delete(id: string) {
    if (confirm('Estas seguro de borrar el registro?')) {
      this.recordDeleted = false;
      this._questionService.delete(id).pipe(
        take(1)
      ).subscribe(() => {
        this.getQuestions(this._user.companyOid);
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }

  public pagination(event) {
    this.questions$ = of(this._tableService.pagination(this.records, this.page, this.pageSize));
  }

}
