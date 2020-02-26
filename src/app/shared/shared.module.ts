import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent2 } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './components/layout/full-layout/full-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { DragulaModule } from 'ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

// services
import { NavService } from "./services/nav.service";
import { CustomizerService } from "./services/customizer.service";
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { NgxPermissionsModule } from 'ngx-permissions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { BackErrorListComponent } from './components/back-error-list/back-error-list.component';
import { SuccessBoxComponent } from './components/success-box/success-box.component';
import { BoxMessageComponent } from './components/box-message/box-message.component';
import { MaterialModule } from '../material.module';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { PaypalComponent } from './components/paypal/paypal.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent2,
    SidebarComponent,
    BookmarkComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent,
    CustomizerComponent,
    NotFoundPageComponent,
    BackErrorListComponent,
    SuccessBoxComponent,
    BoxMessageComponent,
    PaypalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DragulaModule.forRoot(),
    NgbModule,
    GalleryModule.forRoot(),
    NgxPermissionsModule.forChild(),
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent2,
    SidebarComponent,
    BookmarkComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent,
    CustomizerComponent,
    NotFoundPageComponent,
    BackErrorListComponent,
    SuccessBoxComponent,
    BoxMessageComponent,
    PaypalComponent
  ],
  providers: [
    NavService,
    CustomizerService
  ]
})
export class SharedModule { }

