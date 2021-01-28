import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as Hammer from 'hammerjs'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './rootCMP/app.component';
import { PetAppComponent } from './views/pet-app/pet-app.component';
import { PetDetailsComponent } from './views/pet-details/pet-details.component';
import { AboutComponent } from './views/about/about.component';
import { NavbarComponent } from './cmps/navbar/navbar.component';
import { FooterComponent } from './cmps/footer/footer.component';
import { PetListComponent } from './cmps/pet-list/pet-list.component';
import { PetPreviewComponent } from './cmps/pet-preview/pet-preview.component';
import { PetFilterComponent } from './cmps/pet-filter/pet-filter.component';
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}


@NgModule({
  declarations: [
    AppComponent,
    PetAppComponent,
    PetDetailsComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    PetListComponent,
    PetPreviewComponent,
    PetFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HammerModule,
    NgxSmoothDnDModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
