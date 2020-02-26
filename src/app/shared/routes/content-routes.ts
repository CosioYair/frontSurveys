import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    data: {
      breadcrumb: "Dashboard"
    }
  },
  {
    path: 'base',
    loadChildren: './components/base/base.module#BaseModule',
    data: {
      breadcrumb: "Base"
    }
  },
  {
    path: 'advance',
    loadChildren: './components/advance/advance.module#AdvanceModule',
    data: {
      breadcrumb: "Advance"
    }
  },
  {
    path: 'icons',
    loadChildren: './components/icons/icons.module#IconsModule',
    data: {
      breadcrumb: "Icons"
    }
  },
  {
    path: 'buttons',
    loadChildren: './components/buttons/buttons.module#ButtonsModule',
    data: {
      breadcrumb: "Buttons"
    }
  },
  {
    path: 'chart',
    loadChildren: './components/charts/charts.module#ChartModule',
    data: {
      breadcrumb: "Chart"
    }
  },
  {
    path: 'cards',
    loadChildren: './components/cards/cards.module#CardsModule',
    data: {
      breadcrumb: "Cards"
    }
  },
  {
    path: 'timeline',
    loadChildren: './components/timeline/timeline.module#TimelineModule',
    data: {
      breadcrumb: "Timeline"
    }
  },
  {
    path: 'form',
    loadChildren: './components/forms/forms.module#FormModule',
    data: {
      breadcrumb: "Form"
    }
  },
  {
    path: 'gallery',
    loadChildren: './components/gallery/gallery.module#GalleryDemoModule',
    data: {
      breadcrumb: "Gallery"
    }
  },
  {
    path: 'table',
    loadChildren: './components/tables/tables.module#TablesModule',
    data: {
      breadcrumb: "Table"
    }
  },
  {
    path: 'editor',
    loadChildren: './components/editor/editor.module#EditorModule',
    data: {
      breadcrumb: "Editor"
    }
  },
  {
    path: 'users',
    loadChildren: './components/users/users.module#UsersModule',
    data: {
      breadcrumb: "Users"
    }
  },
  {
    path: 'to-do',
    loadChildren: './components/to-do/to-do.module#ToDoModule',
    data: {
      breadcrumb: "To-do"
    }
  },
  {
    path: 'email',
    loadChildren: './components/email/email.module#EmailModule',
    data: {
      breadcrumb: "Email"
    }
  },
  {
    path: 'calender',
    loadChildren: './components/calender/calender.module#CalenderModule',
    data: {
      breadcrumb: "Calender"
    }
  },
  {
    path: 'blog',
    loadChildren: './components/blog/blog.module#BlogModule',
    data: {
      breadcrumb: "Blog"
    }
  },
  {
    path: 'social-app',
    loadChildren: './components/social-app/social-app.module#SocialAppModule',
    data: {
      breadcrumb: "Social-app"
    }
  },
  {
    path: 'job-search',
    loadChildren: './components/job-search/job-search.module#JobSearchModule',
    data: {
      breadcrumb: "Job-Search"
    }
  },
  {
    path: 'learning',
    loadChildren: './components/learning/learning.module#LearningModule',
    data: {
      breadcrumb: "Learning"
    }
  },
  {
    path: 'faq',
    loadChildren: './components/faq/faq.module#FaqModule',
    data: {
      breadcrumb: "Faq"
    }
  },
  {
    path: 'support-ticket',
    loadChildren: './components/support-ticket/support-ticket.module#SupportTicketModule',
    data: {
      breadcrumb: "Support-Ticket"
    }
  },
  {
    path: 'pricing',
    loadChildren: './components/pricing/pricing.module#PricingModule',
    data: {
      breadcrumb: "Pricing"
    }
  },
  {
    path: 'knowledgebase',
    loadChildren: './components/knowledge-base/knowledge-base.module#KnowledgeBaseModule',
    data: {
      breadcrumb: "Knowledge-Base"
    }
  },
  {
    path: 'search-result',
    loadChildren: './components/search-result/search-result.module#SearchResultModule',
    data: {
      breadcrumb: "Search-Result"
    }
  },
  {
    path: 'sample-page',
    loadChildren: './components/sample-page/sample-page.module#SamplePageModule',
    data: {
      breadcrumb: "Sample-Page"
    }
  },
  {
    path: 'map',
    loadChildren: './components/map/map.module#MapModule',
    data: {
      breadcrumb: "Map"
    }
  },
  {
    path: 'ui-elements',
    loadChildren: './components/ui-elements/ui-elements.module#UiElementsModule',
    data: {
      breadcrumb: "UI-Elements"
    }
  },
  {
    path: 'widgets',
    loadChildren: './components/widgets/widgets.module#WidgetsModule',
    data: {
      breadcrumb: "Widgets"
    }
  },
  {
    path: 'ecommerce',
    loadChildren: './components/e-commerce/e-commerce.module#ECommerceModule',
    data: {
      breadcrumb: "Ecommerce"
    }
  },
  {
    path: 'chat',
    loadChildren: './components/chat/chat.module#ChatModule',
    data: {
      breadcrumb: "Chat"
    }
  },
  {
    path: 'contact',
    loadChildren: './components/contact/contact.module#ContactModule',
    data: {
      breadcrumb: "Contact"
    }
  },
  {
    path: 'to-do-firebase',
    loadChildren: './components/to-do-firebase/to-do-firebase.module#ToDoFirebaseModule',
    data: {
      breadcrumb: "To-do"
    }
  },
];