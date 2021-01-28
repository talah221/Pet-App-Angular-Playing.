import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { PetAppComponent } from './views/pet-app/pet-app.component';
import { PetDetailsComponent } from './views/pet-details/pet-details.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'pet/:id', component: PetDetailsComponent },
  { path: '', component: PetAppComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
