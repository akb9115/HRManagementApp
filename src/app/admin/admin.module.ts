import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SummaryPipePipe } from './../shared/pipes/summaryPipe/summary-pipe.pipe';
import { FormDataRetreivalComponent } from './../shared/components/form-data-retreival/form-data-retreival.component';
import { FormComponent } from './../shared/components/form/form.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { SortByPropertyPipe } from 'src/app/shared/pipes/sort-by-property.pipe';
import { ErrorComponent } from './../shared/components/error/error.component';
import { DialogBoxComponent } from './../shared/components/dialog-box/dialog-box.component';
import { ListComponent } from '../shared/components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ViewTogglerComponent } from './view-toggler/view-toggler.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchToggleBarComponent } from './search-toggle-bar/search-toggle-bar.component';
import { CardComponent } from '../shared/components/card/card.component';
import { HttpModule } from '@angular/http';
import { SearchPipe } from './pipes/search.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ShellComponent } from './shell/shell.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeDataComponent } from '../shared/components/employee-data/employee-data.component';
import { ISODatePipe } from '../shared/pipes/iso-date.pipe';
import { SearchedResultsComponent } from './searched-results/searched-results.component';
import { DisabledProfilesComponent } from './disabled-profiles/disabled-profiles.component';
import { DeletedProfilesComponent } from './deleted-profiles/deleted-profiles.component';
import { EditEmployeeProfileComponent } from './edit-employee-profile/edit-employee-profile.component';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { FilteredViewComponent } from '../shared/components/filtered-view/filtered-view.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchToggleBarComponent,
    ViewTogglerComponent,
    DashboardComponent,
    CardComponent,
    ListComponent,
    SearchPipe,
    TruncatePipe,
    ShellComponent,
    EmployeeProfileComponent,
    EmployeeDataComponent,
    ISODatePipe,
    SearchedResultsComponent,
    DisabledProfilesComponent,
    ErrorComponent,
    DeletedProfilesComponent,
    EditEmployeeProfileComponent,
    AddProfileFormComponent,
    FormComponent,
    FormDataRetreivalComponent,
    FilteredViewComponent,
    DepartmentViewComponent,
    SummaryPipePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    AdminRoutingModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [SearchToggleBarComponent,SearchPipe,ISODatePipe,SortByPropertyPipe],
  entryComponents:[CardComponent,DialogBoxComponent]
})
export class AdminModule { }
