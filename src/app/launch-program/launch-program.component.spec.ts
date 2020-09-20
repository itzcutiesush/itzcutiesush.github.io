import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from '../api.service';
import { LaunchProgramComponent } from './launch-program.component';

describe('LaunchProgramComponent', () => {
  let component: LaunchProgramComponent;
  let fixture: ComponentFixture<LaunchProgramComponent>;

  beforeEach(async(() => {
    let activatedRoute: ActivatedRoute;
    let apiService: ApiService;
    let router: Router;

    TestBed.configureTestingModule({
      declarations: [ LaunchProgramComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {snapshot: {queryParams: {'launch_year': '2019', 'launch_success': 'True', 'land_success': 'True'}}} },
        { provide: Router, useValue: router },
        { provide: ApiService, useValue: apiService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
