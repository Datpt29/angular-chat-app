import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  { path: 'partnerlist', component: PartnerListComponent, canActivate: [LoginGuard] },
  { path: 'partneradd', component: PartnerAddComponent, canActivate: [LoginGuard] },
  { path: 'partnerdetail', component: PartnerDetailComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
