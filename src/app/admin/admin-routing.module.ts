import { FormDataRetreivalComponent } from './../shared/components/form-data-retreival/form-data-retreival.component';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { DeletedProfilesComponent } from './deleted-profiles/deleted-profiles.component';
import { ErrorComponent } from './../shared/components/error/error.component';
import { ApiResolverService } from './services/api-resolver.service';
import { SearchedResultsComponent } from './searched-results/searched-results.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ShellComponent } from './shell/shell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/_helpers';
import { EditEmployeeProfileComponent } from './edit-employee-profile/edit-employee-profile.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate:[AuthGuard],
    children:[{
      path:'',
      component:DashboardComponent,
      resolve:{         
        jsonData:ApiResolverService  
      }   
    },
    {
      path:'profile',
      component:EmployeeProfileComponent
    },
    {
      path:'search',
      component:SearchedResultsComponent,
      resolve:{         
        jsonData:ApiResolverService  
      }   
    },
    {
      path:'edit',
      component:EditEmployeeProfileComponent
    },
    {
      path:'add-profile',
      component:AddProfileFormComponent
    },
    {
      path:'form-retrieve',
      component:FormDataRetreivalComponent
    },
    {
      path:'deletedProfiles',
      component:DeletedProfilesComponent,
      resolve:{         
        jsonData:ApiResolverService  
      }
    }, 
    {
      path:'department-filter',
      component:DepartmentViewComponent
    }
  ]
  },
  { path: '404', 
  component: ErrorComponent
   },
  {
    path:'**',
    redirectTo:'404'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }