import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileCompletedGuard } from 'src/app/shared/guard/profile-completed.guard';
import { PaypalSubscriptionGuard } from 'src/app/shared/guard/paypal-subscription.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [ProfileCompletedGuard]
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then(m => m.CompanyModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'PE',
        redirectTo: '/user/profile'
      }
    }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [ProfileCompletedGuard]
  },
  {
    path: 'evaluation',
    loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
    canActivate: [PaypalSubscriptionGuard]
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscritpion/subscritpion.module').then(m => m.SubscritpionModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'SS',
        redirectTo: '/user/profile'
      }
    }
  },
  {
    path: 'subscription-billing/:planId',
    loadChildren: () => import('./subscriptionbilling/subscriptionbilling.module').then(m => m.SubscriptionbillingModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'SS',
        redirectTo: '/user/profile'
      }
    }
  }, {
    path: 'employee-evaluations',
    loadChildren: () =>
      import('./employeeEvaluation/employee-evaluation.module').then(m => m.EmployeeEvaluationModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'PEM',
        redirectTo: '/user'
      }
    },
  }, {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
  }, {
    path: 'domain',
    loadChildren: () => import('./domain/domain.module').then(m => m.DomainModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
  }, {
    path: 'dimension',
    loadChildren: () => import('./dimension/dimension.module').then(m => m.DimensionModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
  }, {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
  }, {
    path: 'survey-section',
    loadChildren: () => import('./surveySection/surveySection.module').then(m => m.SurveySectionModule),
    canActivate: [ProfileCompletedGuard, NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
