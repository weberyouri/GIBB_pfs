import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FightComponent} from "./fight/fight.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'fight',
    component: FightComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
