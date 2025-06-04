import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedComponent } from './authorized.component';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AuthorizedRoutingModule,
    HttpClientModule,
    NzEmptyModule,
    NzTreeModule,
    RouterModule,
  ],
  declarations: [AuthorizedComponent],
})
export class AuthorizedModule {}
