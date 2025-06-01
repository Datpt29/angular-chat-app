import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerAddComponent } from './partner-add/partner-add.component';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PartnerListComponent,
    PartnerAddComponent,
    PartnerDetailComponent,
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ]
})
export class PartnerModule { }
