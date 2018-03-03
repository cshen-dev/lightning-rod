import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../service/courses.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    const authServiceStub = {
      currentUserObservable: null
    };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MaterialModule,
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: CoursesService, useValue: {} },
        MatDialog,
        MatSnackBar
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
