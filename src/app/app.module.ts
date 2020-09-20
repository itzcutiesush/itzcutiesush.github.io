import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LaunchProgramComponent } from './launch-program/launch-program.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchProgramComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:LaunchProgramComponent},
      {path:':launch_year', component:LaunchProgramComponent},
      {path:':launch_success', component:LaunchProgramComponent},
      {path:':land_success', component:LaunchProgramComponent},
      {path:':launch_year/:launch_success', component:LaunchProgramComponent},
      {path:':launch_year/:land_success', component:LaunchProgramComponent},
      {path:':launch_success/:land_success', component:LaunchProgramComponent},
      {path:':launch_year/:launch_success/:land_success', component:LaunchProgramComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
